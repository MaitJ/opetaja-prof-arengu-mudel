require('dotenv').config();


const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const mysql = require('mysql');
const respond = require('express-respond');
const jwt = require('jsonwebtoken');
const jwtdecode = require('jwt-decode');
//const sendRefreshToken = require('./sendRefreshTokens.js');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());

const port = 3001;

const testandmed = require('./testandmed/testandmed');

// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'opprofmudel',
//     password:'0pProfMudel10!',
//     database:'opprofmudeldb'
// });


//connection.connect();

app.use(cors());
app.use(respond);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "admin",
  database: "opetajaprofareng",
});

function auth (req, res) {
  const token = req.cookies.jid;
}

// function ensureToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];
//   if(typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }

function sendRefreshToken (res, token) {
  res.cookie("jid", token, {httpOnly: true, path: "/refresh_token"});
}

function generateAccessToken(emailInput, idInput) {
  return jwt.sign({email: emailInput, id: idInput}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
}

function sendToken (res, token) {
  res.cookie("jid", token, {httpOnly: true, path: "/jwt"});
}

function sendTokentoLogout (res, token) {
  res.cookie("jid", token, {httpOnly: true, path: "/logout"});
}

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


function comparePassword (dbpassword, encrypted) {
  bcrypt.compare(dbpassword, encrypted, (err, res) => {
    console.log("Vorreldud result", res)
  })
}

// const checkExistingEmail = (existingEmail) => {

//   db.query("SELECT * FROM users WHERE email = ?",
//   [existingEmail], (err, results) => {
//     if(err) {
//       console.log(err);
//     }
//     if(results.length > 0) {
//       res.send("Selline email on juba registreeritud!");
//       return true;
//     } else {
//       res.send("Korras");
//       return false;
//     }
//   })

// }

app.get('/getKasutaja', (req, res) => {
    const kasutajaid = req.query.kasutaja_id;
    db.query(`SELECT * FROM Profiil WHERE kasutaja_id=${kasutajaid}`, (error, results, fields) => {
        if (error) throw error;
        let andmed = {};
        andmed.eesnimi = results[0].eesnimi;
        andmed.perenimi = results[0].perenimi;
        const kasutajaroll_id = results[0].kasutajaroll_id;

        db.query(`SELECT rolli_nimi FROM Kasutajaroll WHERE kasutajaroll_id=${kasutajaroll_id}`, (error, results, fields) => {
            if (error) throw error;
            andmed.kasutajaroll = results[0].rolli_nimi;
            res.send(andmed);
        });
    });

});


//select kysimus_id, kysimus_tekst FROM Kysimus JOIN KysimustePlokk ON Kysimus.kysimusteplokk_id=KysimustePlokk.kysimusteplokk_id WHERE Kysimus.kysimusteplokk_id=2;

app.get('/getKysimused', (req, res, next) => {

    if (req.query.kysimusteplokk !== undefined) {
        const kysimusteplokk_id = req.query.kysimusteplokk;
        connection.query(`SELECT kysimus_id, kysimus_tekst FROM Kysimus JOIN KysimustePlokk ON Kysimus.kysimusteplokk_id=KysimustePlokk.kysimusteplokk_id WHERE Kysimus.kysimusteplokk_id=${kysimusteplokk_id}`, (error, results, fields) => {
            if (error) throw error;
            const resultsJson = results.map((result) => {
                return Object.assign({}, result);
            })
            req.data = resultsJson;
            next();
        });

    } else if (req.query.count === "true") {
        connection.query('SELECT COUNT(kysimusteplokk_id) AS plokkidecount FROM KysimustePlokk;', (error, results, fields) => {
            req.data = results[0].plokkidecount;
            next();
        })
    }
    
}, (req, res) => {
    res.json(req.data);
});


//SELECT soovitus_tekst FROM Soovitus JOIN Kysimus ON Soovitus.kysimus_id = Kysimus.kysimus_id WHERE Kysimus.kysimus_id=3;
app.get('/getSoovitused', (req, res, next) => {
    /*
    if (req.query.kysimus !== undefined) {
        req.data = testandmed.soovitused.filter((soovitus) => soovitus.kysimus_id == req.query.kysimus);
    } else {
        req.data = null
    }
    next();
    */

    if (req.query.kysimusid != undefined || req.query.kysimusid != 0) {
        const kysimus_id = req.query.kysimusid;
        connection.query(`SELECT soovitus_tekst FROM Soovitus JOIN Kysimus ON Soovitus.kysimus_id = Kysimus.kysimus_id WHERE Soovitus.kysimus_id=${kysimus_id};`, (error, results, fields) => {
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
      console.log(error);
    }
  })
  
  // token on oige ja voime saata tagasi accessTokeni


})

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
  //console.log("See on token" + token);
  //const date = Date.now();
  //const {email} = jwtdecode(token);
  //console.log("SEE ON EMAIL" + email);
  // db.query("UPDATE users SET last_active = ? WHERE email = ?", [date, email], (err, result) => {
    
  //   console.log("SEE ON RESULT: " + result);
  //   // if(err) {
  //   //   console.log("ERROR" + err);
  //   // }
  //   // if (result != null) {
  //   //   return res.send(result);
  //   // } else {
  //   //   return res.send({message: "Tekkis mingi viga!"});
  //   // }
  // })
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
      //res.sendStatus(403);
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
    })

    db.query("INSERT INTO profiil (eesnimi, perenimi, telefon, tookoht, kasutajaroll_id) VALUES (?, ?, ?)", [firstName, lastName, phone, job, 1], (err, result) => {
      check('eesnimi', 'Eesnimi on sisestamata!').notEmpty();
      check('perenimi', 'Perekonnanimi ei ole korralik!').notEmpty();
      check('telefon', 'Telefoninumber on sisestamata!').notEmpty();
      check('tookoht', 'Tookoht on sisestamata!').notEmpty();
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
        res.send({message: result});
      }
    })
})

app.listen(port, () => {
    console.log("Server running at: " + port);
})


// if(comparePassword(password, results[0].password == true)) {
//         const token = jwt.sign(results[0].email, process.env.ACCESS_TOKEN_SECRET);
//         res.json({tulemus: 'hashid klapivad', token: token, localpw: password, dbpw: results[0].password, another: comparePassword(password, results[0].password)});
//       } else { 
//         res.json({vastus: 'Ligipaas keelatud!', compare: comparePassword(password, results[0].password)});
//       }
