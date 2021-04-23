const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const port = 3001;

const kysimused = require('./kysimused');

app.use(cors());

app.get('/getKysimused', (req, res, next) => {
    if (req.query.plokk !== undefined) {
        req.data = kysimused.kysimused.filter((kysimus) => kysimus.kysimusteplokk_id == req.query.plokk);
    } else {
        req.data = kysimused.kysimused;
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