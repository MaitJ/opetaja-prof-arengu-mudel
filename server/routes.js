
const getKasutja = (app) => {
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
};

module.exports = (app) => {
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

}

exports.getKasutja = getKasutja;
