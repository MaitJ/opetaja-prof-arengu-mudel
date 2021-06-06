const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const mysql = require('mysql');
const port = 3001;

const testandmed = require('./testandmed/testandmed');

const connection = mysql.createConnection({
    host:'localhost',
    user:'opprofmudel',
    password:'0pProfMudel10!',
    database:'opprofmudeldb'
});


connection.connect();
app.use(cors());

app.get('/getKasutaja', (req, res) => {
    const kasutajaid = req.query.kasutaja_id;
    connection.query(`SELECT * FROM Profiil WHERE kasutaja_id=${kasutajaid}`, (error, results, fields) => {
        if (error) throw error;
        let andmed = {};
        andmed.eesnimi = results[0].eesnimi;
        andmed.perenimi = results[0].perenimi;
        const kasutajaroll_id = results[0].kasutajaroll_id;

        connection.query(`SELECT rolli_nimi FROM Kasutajaroll WHERE kasutajaroll_id=${kasutajaroll_id}`, (error, results, fields) => {
            if (error) throw error;
            andmed.kasutajaroll = results[0].rolli_nimi;
            res.send(andmed);
        });
    });

});



app.get('/getKysimused', (req, res, next) => {
    if (req.query.plokk !== undefined) {
        req.data = testandmed.kysimused.filter((kysimus) => kysimus.kysimusteplokk_id == req.query.plokk);
    } else if (req.query.count !== true) {
        let plokid = [];
        for (let i = 0; i < testandmed.kysimused.length; ++i) {
            if (!plokid.includes(testandmed.kysimused[i].kysimusteplokk_id)) {
                plokid = [...plokid, testandmed.kysimused[i].kysimusteplokk_id];
            }
        }

        req.data = plokid.length;
    }
    else {
        req.data = testandmed.kysimused;
    }
    
    next();
}, (req, res) => {
    res.json(req.data);
});


app.get('/getSoovitused', (req, res, next) => {
    if (req.query.kysimus !== undefined) {
        req.data = testandmed.soovitused.filter((soovitus) => soovitus.kysimus_id == req.query.kysimus);
    } else {
        req.data = null
    }
    next();
}, (req, res) => {
    res.send(req.data);
});

app.get('/', (req, res) => {
    res.send("hello guys");
});

app.listen(port, () => {
    console.log("Server running at: " + port);
})