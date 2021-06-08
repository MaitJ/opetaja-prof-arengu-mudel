import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import Kysimusteplokk from './Kysimusteplokk';

const kysimused_url = "http://localhost:3001/getKysimused";

const Kysimustik = ({kysimustik_id}) => {
    const [kysimusedList, setKysimusedList] = useState([]);
    const [loading, isLoading] = useState(false);
    const [selectedPlokk, setKysimustePlokk] = useState(1);
    const [mituPlokki, setMituPlokki] = useState(0);
    const [kysimusteVastused, setKysimusteVastused] = useState([]);

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

    const displayPlokkButtons = () => {
        if (selectedPlokk < mituPlokki - 1) {
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

    const liiguEdasi = () => {
        if (kasOnTaidetud()) {
            setKysimustePlokk(selectedPlokk + 1);
        } else {
            console.log("Sul ei ole kysimused taidetud");
        }

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
