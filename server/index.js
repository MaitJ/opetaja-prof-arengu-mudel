const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const port = 3001;

app.use(cors());

app.get('/', (req, res) => {
    res.send("hello guys");
});

app.listen(port, () => {
    console.log("Server running at: " + port);
})