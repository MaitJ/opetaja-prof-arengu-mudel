const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const port = 3001;

const testandmed = require('./testandmed/testandmed');

app.use(cors());

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

        console.log(plokid.length);
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
        console.log(testandmed.soovitused);
        console.log(req.query.kysimus);
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