import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import Kysimusteplokk from './Kysimusteplokk';

const kysimused_url = "http://localhost:3001/getKysimused";
const salvestamise_url = 'http://localhost:3001/kirjutaVastused';

const Kysimustik = ({kysimustik_id, profiil_kysimustik_id}) => {
    const [kysimusedList, setKysimusedList] = useState([]);
    const [loading, isLoading] = useState(false);
    const [selectedPlokk, setKysimustePlokk] = useState(1);
    const [mituPlokki, setMituPlokki] = useState(0);
    const [kysimusteVastused, setKysimusteVastused] = useState([]);
    const [kysimusteIdArr, setKysimusteIdArr] = useState([]);
    const [curProtsentuaalneTulemus, setCurProtsentuaalneTulemus] = useState(0);
    const [tulemuseVaheleht, setTulemuseVaheleht] = useState(false);
    const [currentFeedback, setCurrentFeedback] = useState('');
    const [currentFeedbackId, setCurrentFeedbackId] = useState(0);
    const [questionBlockStats, setQuestionBlockStats] = useState([]);

    useEffect(() => {
        isLoading(true);
        /*
        const plokkSelection = "?kysimusteplokk=";
        const kysimustikSelection = `&kysimustik=${kysimustik_id}`;
        axios.get(kysimused_url + plokkSelection + selectedPlokk + kysimustikSelection)
        .then((response) => {
            setKysimusedList(response.data);
            isLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
        */

        axios.post(kysimused_url, {kysimusteplokk_id: selectedPlokk, kysimustik_id: kysimustik_id})
        .then((response) => {
            setKysimusedList(response.data);
            isLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [selectedPlokk])

    //Profiil_kysimustik_id KysimustikuValik komponendilt ja see edasi vastuste sisestamis funktsioonile

    useEffect(() => {
        axios.post(kysimused_url, {kysimusteplokk_id: selectedPlokk, kysimustik_id: kysimustik_id})
        .then((response) => {
            let praegunePlokk = [];
            for (let i = 0; i < response.data.length; ++i) {praegunePlokk = [...praegunePlokk, response.data[i].kysimus_id];}
            setKysimusteIdArr(praegunePlokk);
        })
        .catch((err) => console.log(err))
    }, [selectedPlokk]);

    useEffect(() => {
        /*
        const countSelection = "?count=true";
        axios.get(kysimused_url + countSelection)
        .then((response) => {
            setMituPlokki(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
        */
        axios.post(kysimused_url, {count: true})
        .then((response) => {
            setMituPlokki(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        kysimusedList.map((kysimus) => {
            setKysimusteVastused((prevState) => {
                return [...prevState, {id: kysimus.kysimus_id, vastus: null, enesehinnang: null}];
            })
        });
    }, [kysimusedList])

    useEffect(() => {
        console.log(kysimusteVastused);
    }, [kysimusteVastused])

    if (loading) {
        return (
            <section className="kysimuse-container">
                <h3>Loading ...</h3>
            </section>
        );
    }
    const lopetaKysimustik = () => {
        //Saada profiil_kysimustik_id ja koik vastused backendi.
        axios.post(salvestamise_url, {profiil_kysimustik_id: profiil_kysimustik_id, vastused: kysimusteVastused, tagasisided: questionBlockStats})
        .then((response) => {

            /*
            if (response.data) {
                //Arvuta automaatne tagasiside
            }
            */
        })
        .catch((err) => console.log(err));
    };

    const saveFeedback = () => {
        setQuestionBlockStats([...questionBlockStats, {protsentuaalne_tagasiside: curProtsentuaalneTulemus,
        profiil_kysimustik_id: profiil_kysimustik_id, tagasiside_id: currentFeedbackId}])
    }


    const statPageBtnHandler = () => {
        if (selectedPlokk === mituPlokki) {
            return(<button className="next-block-button" onClick={() => lopetaKysimustik()}>Lopeta kysimustik</button>)
        } else {
            return(<button className="next-block-button" onClick={() => {
                setKysimustePlokk(selectedPlokk + 1);
                saveFeedback();
                setTulemuseVaheleht(false);}}>J2rgmine leht</button>)
        }
    };

    if (tulemuseVaheleht) {
        return (
            <section className="tulemuse_vaheleht-container">
                <h5>Selle ploki tulemus: {curProtsentuaalneTulemus}</h5>
                <h5>Tagasiside_id: {currentFeedbackId}</h5>
                <h5>Profiil_kysimustik_id: {profiil_kysimustik_id}</h5>
                <p>{currentFeedback}</p>
                {statPageBtnHandler()}
            </section>
        );
    }

    const arvutaMaxPunktid = () => {
        let summa = 0;
        for (let i = 0; i < kysimusteIdArr.length; ++i) { summa += 3 };
        return summa;
    };


    const displayPlokkButtons = () => {
        if (selectedPlokk <= mituPlokki) {
            return <button type="button" onClick={() => liiguEdasi()}>Jargmine leht</button>
        }
    };

    const kasOnTaidetud = () => {
        for (let i = 0; i < kysimusteVastused.length; ++i) {
            if (kysimusteVastused[i].vastus == null || kysimusteVastused[i].enesehinnang == null) {
                return false;
            }
        }
        /*
        kysimusteVastused.forEach(kysimus => {
            if (kysimus.vastus === null) {
                return false;
            }
        })
        */
        return true;
    };

    const arvutaTaidetudPunktid = () => {
        let summa = 0;
        for (let i = 0; i < kysimusteIdArr.length; ++i) {
            console.log(parseInt(kysimusteVastused[kysimusteIdArr[i] - 1].vastus));
            summa += parseInt(kysimusteVastused[kysimusteIdArr[i] - 1].vastus);
        }
        return summa;
    };

    //Saada protsent backendi ja kysi tagasiside teksti
    const getFeedback = (percentage) => {

        axios.post('http://localhost:3001/getFeedback', {percentage: percentage, questionblock_id: selectedPlokk})
        .then((response) => {
            console.log(response.data);
            setCurrentFeedback(response.data.tagasiside_tekst);
            setCurrentFeedbackId(response.data.tagasiside_id);

        })
        .catch((error) => console.log(error));

    };

    //

    const liiguEdasi = () => {
        //if (kasOnTaidetud()) {
            const maxPunktid = arvutaMaxPunktid();
            const taidetudPunktid = arvutaTaidetudPunktid();

            // 39 - 100%
            // 28 - x%
            //(28 * 100) / 39

            const protsentuaalneTagasiside = (taidetudPunktid * 100) / maxPunktid;
            setCurProtsentuaalneTulemus(protsentuaalneTagasiside);
            getFeedback(protsentuaalneTagasiside);

            setTulemuseVaheleht(true);
        //} else {
        //    console.log("Sul ei ole kysimused taidetud");
       // }

    }




    return(
        <section className="kysimused-container">
            <h3>Kysimused</h3>
            <form>
                <Kysimusteplokk kysimused={kysimusedList} key={selectedPlokk} displayPlokkButtons={displayPlokkButtons} setKysimusteVastused={setKysimusteVastused} kysimusteVastused={kysimusteVastused}/>
            </form>
        </section>
    );
}

export default Kysimustik;
