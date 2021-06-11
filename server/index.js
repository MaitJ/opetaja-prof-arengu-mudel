require('dotenv').config();


const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const mysql = require('mysql');
const respond = require('express-respond');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtdecode = require('jwt-decode');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer")
const { check, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const bodyParser = require('body-parser');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: path.resolve(__dirname, ".","../../client/public/uploads/images"),
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png')
  }
})
const routes = require('./routes');

//const upload = multer();

var storageFile = multer.diskStorage({
  destination: __dirname + '/uploads/files',
  filename: function(req, file, cb) {
    if(file.mimetype === 'image/jpeg') {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    } else if(file.mimetype === 'image/png') {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    } else if (file.mimetype === 'application/pdf') {
      cb(null, file.fieldname + '-' + Date.now() + '.pdf')
    } else if (file.mimetype === 'video/mp4') {
      cb(null, file.fieldname + '-' + Date.now() + '.mp4')
    }
  }
})


const upload = multer({storage: storage});
const uploadFile = multer({storage: storageFile});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/", router);



const port = 3001;

const testandmed = require('./testandmed/testandmed');
const { response } = require('express');
app.use(cors({credentials: true, origin: true}));
app.use(respond);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "admin",
  database: "opetajaprofareng"
});

function auth (req, res) {
  const token = req.cookies.jid;
}

function sendRefreshToken (res, token) {
  res.cookie("jid", token, {httpOnly: true, path: "/refresh_token"});
}

function generateAccessToken(emailInput, idInput) {
  return jwt.sign({email: emailInput, id: idInput}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
}

function sendToken (res, token) {
  res.header('Access-Control-Allow-Credentials', 'true')
  res.cookie("jid", token, {httpOnly: true, path: "/jwt"});
}

function sendTokentoLogout (res, token) {
  res.header('Access-Control-Allow-Credentials', 'true')
  res.cookie("jid", token, {httpOnly: true, path: "/logout"});
}

// function sendTokentoGetKasutaja (res, token) {
//   res.cookie("jid", token, {httpOnly: true, path: "/getKasutaja"});
// }

function createRefreshToken (emailInput, idInput) {
  return jwt.sign({email: emailInput, id: idInput}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
}

const hashPassword = async (password, saltRounds = 10) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log("error: " + error);
    }
    return null;
};

const resize = async (imageFile, image) => {
  await sharp(imageFile.path).resize(500).jpeg({quality: 50}).toFile(path.resolve(imageFile.destination,'resized',image));
  fs.unlinkSync(req.file.path);
}


function comparePassword (dbpassword, encrypted) {
  bcrypt.compare(dbpassword, encrypted, (err, res) => {
    console.log("Vorreldud result", res)
  })
}


app.post('/getKasutaja', (req, res) => {  
    const kasutajaid = req.body.kasutajaid;
    db.query(`SELECT * FROM profiil WHERE kasutaja_id=${kasutajaid}`, (error, results, fields) => {
        if (error) {
          console.log("ERROR: " + error);
          throw error;
        } 
        let andmed = {};
        andmed.eesnimi = results[0].eesnimi;
        andmed.perenimi = results[0].perenimi;
        andmed.telefon = results[0].telefon;
        andmed.tookoht = results[0].tookoht;
        andmed.profilepicture = results[0].profiilipilt;
        andmed.oppematerjal = results[0].oppematerjal;
        const kasutajaroll_id = results[0].kasutajaroll_id;

        db.query(`SELECT rolli_nimi FROM Kasutajaroll WHERE kasutajaroll_id=${kasutajaroll_id}`, (error, results, fields) => {
            if (error) throw error;
            andmed.kasutajaroll = results[0].rolli_nimi;
        });

        db.query(`SELECT email FROM kasutaja WHERE kasutaja_id=${kasutajaid}`, (error, results) => {
          if (error) {
            console.log(error);
            throw error;
          }
          andmed.email = results[0].email;
          res.send(andmed);
        })
    });

});


//routes.getKasutaja(app);


//Vaata, kas kysimustik on pooleli, olenevalt sellest tekita profiil_kysimustikku
//kirje voi uuenda olemasolevat kirjet

app.post('/kirjutaVastused', (req, res, next) => {
  if (req.body !== undefined) {
    //Kysi profiil_kysimustiku_id'd vastavalt bodys oleva kasutaja_id'le ja kysimustik_id'le
    const profiil_kysimustik_id = req.body.profiil_kysimustik_id;
    const kysimusteVastused = req.body.vastused;
    req.status = 0;

    //Kirjuta ennem eneseanalyys ning siis alles vastus kuna 1-1

    //INSERT INTO eneseanalyys (eneseanalyys_tekst) VALUES (kysimusteVastused[i].eneseanalyys);

    db.query('SELECT MAX(eneseanalyys_id) AS eneseanalyys_count FROM eneseanalyys;', (error, result, fields) => {
      if (error) throw error;
      let eneseanalyys_count = result[0].eneseanalyys_count + 1;

      let eneseanalyysSQL = 'INSERT INTO eneseanalyys (eneseanalyys_tekst) VALUES ?';
      let eneseanalyysData = [];

      for (let i = 0 ; i < kysimusteVastused.length; ++i) {
        eneseanalyysData = [...eneseanalyysData, [kysimusteVastused[i].eneseanalyys]];
      }

      db.query(eneseanalyysSQL, [eneseanalyysData], (error, result, fields) => {
        if (error) throw error;

        //Vahetasin vertabelos ara eneseanalyys_id siin eneseanalyys_eneseanalyys_id
        let vastusSQL = 'INSERT INTO kysimus_vastus (profiil_kysimustik_id, kysimus_id, vastus, eneseanalyys_eneseanalyys_id) VALUES ?';
        let vastusData = [];
        for (let i = 0; i < kysimusteVastused.length; ++i) {
          vastusData = [...vastusData, [profiil_kysimustik_id, kysimusteVastused[i].id, kysimusteVastused[i].vastus
        ,eneseanalyys_count]];
          ++eneseanalyys_count;
        }
        
        db.query(vastusSQL, [vastusData], (error, result, fields) => {
          if (error) throw error;
          req.status = 1;
          next();
        })


      })



    })
    //INSERT INTO kysimus_vastus (profiil_kysimustik_id, kysimus_id, vastus, eneseanalyys_id) VALUES (...);
  }

}, (req, res) => {
  res.json(req.status);
});


app.post('/tekitaKysimustik', (req, res, next) => {
  if (req.body.kasutaja_id !== undefined && req.body.kysimustik_id !== undefined) {
    const kasutaja_id = req.body.kasutaja_id;
    const kysimustik_id = req.body.kysimustik_id;
    db.query(`SELECT profiil_id FROM profiil WHERE kasutaja_id=${kasutaja_id}`, (error, results) => {
      if(error) throw error;
      var profiil_id;
      console.log("REULTSES: " + results[0].profiil_id);
      profiil_id = results[0].profiil_id;
      db.query(`SELECT * FROM profiil_kysimustik WHERE profiil_id=${profiil_id} AND kysimustik_id=${kysimustik_id}`, (error, results, fields) => {
        if (error) throw error;
  
        if (results[0] == undefined) {
            //INESRT INTO profiil_kysimustik (kysimustik_id, profiil_id) VALUES (1, 1);
          db.query(`INSERT INTO profiil_kysimustik (kysimustik_id, profiil_id) VALUES (${kysimustik_id}, ${profiil_id})`, (error, results, fields) => {
            if (error) throw error;
            req.status = 1;
            next();
          });
        }
  
        else {
          req.status = 1;
          next();
        }
  
      });

      
    })
    
  }
}, (req, res) => {
  res.json({profiil_kysimustik_id: req.profiil_kysimustik_id, status: req.status});

});

//select kysimus_id, kysimus_tekst FROM Kysimus JOIN KysimustePlokk ON Kysimus.kysimusteplokk_id=KysimustePlokk.kysimusteplokk_id WHERE Kysimus.kysimusteplokk_id=2;

app.post('/getKysimused', (req, res, next) => {
    if (req.body.kysimusteplokk_id !== undefined && req.body.kysimustik_id !== undefined) {
        const kysimusteplokk_id = req.body.kysimusteplokk_id;
        const kysimustik_id = req.body.kysimustik_id;
        db.query(`SELECT kysimus_id, kysimus_tekst FROM Kysimus 
        JOIN KysimustePlokk ON Kysimus.kysimusteplokk_id=KysimustePlokk.kysimusteplokk_id 
        WHERE Kysimus.kysimusteplokk_id=${kysimusteplokk_id}
        AND KysimustePlokk.kysimustik_id=${kysimustik_id}`, (error, results, fields) => {
            if (error) throw error;
            const resultsJson = results.map((result) => {
                return Object.assign({}, result);
            })
            req.data = resultsJson;
            next();
        });

    } else if (req.body.count) {
        db.query('SELECT COUNT(kysimusteplokk_id) AS plokkidecount FROM KysimustePlokk;', (error, results, fields) => {
            req.data = results[0].plokkidecount;
            next();
        })
    } else if (req.body.kysimustik !== undefined) {
      //Fix pls
    } else if (req.body.kysimustikud) {
      db.query('SELECT kysimustik_id, kysimustik_pealkiri FROM Kysimustik;', (error, results, fields) => {
        if (error) throw error;
        const resultsJson = results.map((result) => {
          return Object.assign({}, result);
        })
        req.data = resultsJson;
        next();
      });
    }
    
}, (req, res) => {
    res.json(req.data);
});


//SELECT soovitus_tekst FROM Soovitus JOIN Kysimus ON Soovitus.kysimus_id = Kysimus.kysimus_id WHERE Kysimus.kysimus_id=3;
app.post('/getSoovitused', (req, res, next) => {
    /*
    if (req.query.kysimus !== undefined) {
        req.data = testandmed.soovitused.filter((soovitus) => soovitus.kysimus_id == req.query.kysimus);
    } else {
        req.data = null
    }
    next();
    */

    if (req.body.kysimusid != undefined || req.body.kysimusid != 0) {
        const kysimus_id = req.body.kysimusid;
        db.query(`SELECT soovitus_tekst FROM Soovitus JOIN Kysimus ON Soovitus.kysimus_id = Kysimus.kysimus_id WHERE Soovitus.kysimus_id=${kysimus_id};`, (error, results, fields) => {
            if (error) throw error;
            if (results.length > 1) {
                const soovitused = results.map((result) => {
                    return Object.assign({}, result);
                })
                req.data = soovitused;
            } else 
            {
                req.data = results[0];
            }
            next();
        })
    }
}, (req, res) => {
    res.json(req.data);
});

app.get('/', (req, res) => {
    res.send("hello guys");
});

//SELECT * FROM tagasiside WHERE kysimusteplokk_id=questionblock_id AND percentage >= vahemikMin AND percentage <= vahemikMax;
app.post('/getFeedback', (req, res, next) => {
  if (req.body.percentage !== undefined && req.body.questionblock_id !== undefined) {
    const percentage = req.body.percentage;
    const questionblock_id = req.body.questionblock_id;

    console.log("percentage: " + percentage + " questionblock_id: " + questionblock_id);

    db.query(`SELECT tagasiside_id, tagasiside_tekst FROM tagasiside WHERE kysimusteplokk_id=${questionblock_id} AND ${percentage} >= vahemikMin AND ${percentage} <= vahemikMax`,
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);

      if (results[0].tagasiside_tekst !== undefined) {
        
        req.data = {tagasiside_tekst: results[0].tagasiside_tekst, tagasiside_id: results[0].tagasiside_id};
      } else {
        req.data = "";
      }
      next();
    })
  } else {
    req.data = 0;
    next();
  }

}, (req, res) => {
  res.json(req.data);
});

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const hash = await hashPassword(password);

  db.query("SELECT * FROM kasutaja WHERE email = ?",
  [email], (err, results) => {
    if (results.length === 0) {
      return res.status(400).json({msg: "Kasutajat ei leitud"});
    }
    try {
       bcrypt.compare(password, results[0].salasona, (err, data) => {
         if (err) {
           throw err;
         }
         if (data) {
          sendRefreshToken(res, createRefreshToken(results[0].email, results[0].kasutaja_id));
          const accToken = generateAccessToken(results[0].email, results[0].kasutaja_id);
           console.log("touken: " + results[0].kasutaja_id);
           console.log("Login token: " + accToken);
           sendToken(res, accToken);
           sendTokentoLogout(res, accToken);
           return res.status(200).json({ msg: "Login success", accessToken: accToken })
         } else {
           return res.status(401).json({ msg: "Invalid credencial" })
         }
       })
    } catch(error) {
        console.log("error: " + error);
        res.status(500).send();
    }
  })
})

app.post('/refresh_token', (req, res) => {
  const token = req.cookies.jid;
  if (!token) {
    console.log("token: " + token);
    return res.send({ok: false, accessToken: ''});
  }
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log("payload" + payload);
  } catch(err) {
    console.log("error: " + err)
    return res.send({ok: false, accessToken: ''});
  }

  const email = payload.email;
  console.log("email: " + email[0]);
  console.log(JSON.stringify(email));

  db.query("SELECT * FROM kasutaja WHERE email = ?",
  [email], (err, results) => {
    if (err) {
      throw err;
    }
    console.log("results: " + results);
    if (results.length === 0) {
      return res.status(400).send("Kasutajat ei leitud");
    }
    try {
      // if (err) {
      //   throw err;
      // }
      const user = results[0].email;
      if(!user) {
        return res.send({ok: false, accessToken: ''});
      }
      sendRefreshToken(res, createRefreshToken(results[0].email, results[0].kasutaja_id));
      const accToken = generateAccessToken(results[0].email, results[0].kasutaja_id);
      sendToken(res, accToken);
      sendTokentoLogout(res, accToken);
      return res.send({ok: true, user: user, accessToken: accToken});
    } catch (error) {
      throw error;
    }
  })
  
  // token on oige ja voime saata tagasi accessTokeni


})

app.post('/changeprofile', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var phone = req.body.phone;
  var job = req.body.job;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var kasutajaid = req.body.userid;

  db.query(`SELECT * FROM profiil WHERE kasutaja_id=${kasutajaid}`, (error, results) => {
    if (error) {
      throw error;
    }

    if(firstName == "") {
      firstName = results[0].eesnimi;
    }
    if(phone == "") {
      phone = results[0].telefon;
    }
    if(job == "") {
      job = results[0].tookoht;
    }
    if(lastName == "") {
      lastName = results[0].perenimi;
    }

    db.query(`SELECT email FROM kasutaja WHERE kasutaja_id=${kasutajaid}`, (error, results) => {
      if(email == "") {
        email = results[0].email;
      }

      db.query(`UPDATE kasutaja SET email='${email}' WHERE kasutaja_id=${kasutajaid}`, (err, result) => {
        //check('email', 'Email on sisestamata!').notEmpty();
        //check('email', 'Email ei ole korralik!').isEmail();
        //check('password', 'Salasona vali on tyhi!').notEmpty();
        if(err) {
          console.log(err);
          res.send({err: err});
        }
        if (result != null) {
          console.log(result);
          //res.send(result);
        }
        // } else {
        //   //res.send({message: "Midagi laks valesti!"});
        // }
    
        db.query(`UPDATE profiil SET telefon='${phone}', tookoht='${job}', eesnimi='${firstName}', perenimi='${lastName}' WHERE kasutaja_id=${kasutajaid} `, (error, result) => {
          if (error) {
            console.log(error);
            throw error;
          } else {
            return res.status(200).json({ msg: "Andmed salvestatud"})
          }
        })
      });
    })
  })
})

app.post('/uploadimage', upload.single("file"), async (req, res) => {
  
  console.log(req.file);
  const { filename: image } = req.file;
  const imageName = "profilepic-"+Date.now();

  await sharp(req.file.path)
  .resize(300, 300)
  .jpeg({quality: 50}).toFile("../client/public/uploads/images/"+ imageName +  ".jpg");
  // .toFile(
  //   path.resolve(req.file.destination,'resized',image)
  // )
  
  // sharp(req.file.path).resize(500).jpeg({quality: 50}).toFile(path.resolve(req.file.destination,'resized',image));
  // fs.unlinkSync(req.file.path);

  //const imageName = req.file.filename;
  const userid = req.body.userid;

  console.log(userid);

  db.query(`UPDATE profiil SET profiilipilt='${imageName}' WHERE kasutaja_id=${userid}`, (error, result) => {
    if(error) {
      console.log(error);
      throw error;
    }

    db.query(`SELECT profiilipilt FROM profiil WHERE kasutaja_id=${userid}`, (error, result) => {
      if(error) {
        throw error;
      } else {
        let data = {};
        data.image = result[0].profiilipilt;
        //var image = result[0].profiilipilt;
        res.send(data);
      }
    })
  })
 
  

  
})

app.post('/useridtest', (req, res) => {
  const userid = req.body.kasutajaid;

  console.log("SEE ON USERID: " + userid);

  return res.status(200).json({ msg: userid});
})

app.post("/uploadfile", function (req, res, next) {
  uploadFile.single('oppematerjal')(req, res, function (error) {
    if (error) {
      console.log(`upload.single error: ${error}`);
      return res.sendStatus(500);
    }
      console.log("filename: " + req.file.filename);
  })
  // upload.single('oppematerjal')(req, res, function (error) {
  //   if (error) {
  //     console.log(`upload.single error: ${error}`);
  //     return res.sendStatus(500);
  //   }
  //   console.log("filename: " + req.file.filename);
  
  //   // const fileName = req.file.filename;
  //   // const userid = req.body.userid;

  //   // db.query(`UPDATE profiil SET oppematerjal='${fileName}' WHERE kasutaja_id=${userid}`, (error, result) => {
  //   //   if(error) {
  //   //     console.log(error);
  //   //     throw error;
  //   //   } else {
  //   //     res.send({file: fileName});
  //   //   }
  //   // })
  //   // })
});

// app.post('/uploadfile', uploadFile.single("oppematerjal"), (req, res) => {
//   const fileName = req.file.filename;
//   const userid = req.body.userid;

//   db.query(`UPDATE profiil SET oppematerjal='${fileName}' WHERE kasutaja_id=${userid}`, (error, result) => {
//     if(error) {
//       console.log(error);
//       throw error;
//     } else {
//       res.send({file: fileName});
//     }
//   })
// })

app.get('/jwt', (req, res) => {
  const token = req.cookies.jid;

  res.cookie('jid', token, { httpOnly: true });

  if(!token) {
    console.log("Tokenit pole");
  } else {
    console.log("/jwt token: " + token);
  }

  return res.send({accTok: token});

});

app.post('/logout', (req, res) => {
  const token = req.cookies.jid;
  res.clearCookie("jid");
  sendRefreshToken(res, "");
  sendToken(res, "");
  sendTokentoLogout(res, "");
  res.send({status: 'logged out', touken: token});
})

app.get('/about', function(req, res) {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, function(err, data) { 
    if (err) {
      res.json({err: err})
    } else {
      res.json({ text: 'see on kaitstud', data: data})
    }
  })
})

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    return res.sendStatus(401);
  }
  if (!refreshToken.includes(refreshToken)) {
    res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = generateAccessToken({ email: email});

    res.json({accessToken : accessToken});
  })

})

app.delete('/logout', (req, res) => {
  refreshTokens
})

app.post('/register', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const job = req.body.job;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const hash = await hashPassword(password);

    db.beginTransaction(function(err) {
      if(err) {throw err; }
    })
      db.query("INSERT INTO kasutaja (email, salasona) VALUES (?, ?)", [email, hash], (err, result) => {
        check('email', 'Email on sisestamata!').notEmpty();
        check('email', 'Email ei ole korralik!').isEmail();
        check('password', 'Salasona vali on tyhi!').notEmpty();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        if(err) {
          res.send({err: err});
        }
        if (result != null) {
          res.send(result);
        } else {
          res.send({message: "Vale email / salasona!"});
        }
      

      var kasutajaID = result.insertId;

      db.query("INSERT INTO profiil (eesnimi, perenimi, kasutaja_id, telefon, tookoht, kasutajaroll_id) VALUES (?, ?, ?, ?, ?, ?)", [firstName, lastName, kasutajaID, phone, job, 1], (err, result) => {
        check('eesnimi', 'Eesnimi on sisestamata!').notEmpty();
        check('perenimi', 'Perekonnanimi ei ole korralik!').notEmpty();
        check('telefon', 'Telefoninumber on sisestamata!').notEmpty();
        check('tookoht', 'Tookoht on sisestamata!').notEmpty();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        if(err) {
          //res.send({err: err});
          console.log("ERROR: " + err);
        }
        if (result != null) {
          console.log(result);
          //res.send(result);
        } else {
          console.log(result);
          //res.send({message: result});
        }
      

      db.commit(function(err) {
        if (err) {
          return db.rollback(function() {
            throw err;
          });
        }
        console.log('success!');
      });
    });
  });
})

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "opetajaprofareng@gmail.com",
    pass: "Opetajaareng1!",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Valmis saatma");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: name,
    to: "opetajaprofareng@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

app.listen(port, () => {
    console.log("Server running at: " + port);
})


// if(comparePassword(password, results[0].password == true)) {
//         const token = jwt.sign(results[0].email, process.env.ACCESS_TOKEN_SECRET);
//         res.json({tulemus: 'hashid klapivad', token: token, localpw: password, dbpw: results[0].password, another: comparePassword(password, results[0].password)});
//       } else { 
//         res.json({vastus: 'Ligipaas keelatud!', compare: comparePassword(password, results[0].password)});
//       }
