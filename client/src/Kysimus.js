import React, { useEffect, useState } from 'react';
import axios from 'axios';

const soovitusAPI = "http://localhost:3001/getSoovitused/";

const kysimusteValikud = [{
    valik_tekst: "Halvasti",
    value: 1
},
{
    valik_tekst: "Keskmiselt",
    value: 2
},
{
    valik_tekst: "Hasti",
    value: 3
}];

const Kysimus = ({kysimus, setKysimusteVastused, kysimusteVastused}) => {
    const [soovitused, setSoovitused] = useState([]);

    useEffect(() => {
        const kysimusSelector = "?kysimusid=" + kysimus.kysimus_id;
        axios.get(soovitusAPI + kysimusSelector).then((response) => {
            setSoovitused((prevState) => {
                return [...prevState, response.data]});
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        console.log(soovitused);
        console.log(soovitused.length);
    }, [soovitused]);

    const kuvaSoovitused = () => {
        return(
            <div className="soovitused-container">
                {
                    soovitused.map((soovitus, index) => {
                        if (soovitus.soovitus_tekst) {
                            return <p className="soovitus">{index + 1}. {soovitus.soovitus_tekst}</p>;
                        }
                    })
                }
            </div>
        );
    }

    const setVastus = (e) => {
        const vastus = {
            kysimus_id: kysimus.kysimus_id,
            vastus: e.target.value
        };
        setKysimusteVastused(prevState => {
            let newState = [...prevState];
            if (prevState[kysimus.kysimus_id - 1]) {
                newState[kysimus.kysimus_id - 1].vastus = vastus.vastus;
            } else {
                newState[kysimus.kysimus_id - 1] = vastus;
            }
            return newState;
        });
    };

    const kasOnTaidetud = (valik) => {
        if (kysimusteVastused !== undefined) {
            if (kysimusteVastused[kysimus.kysimus_id - 1].vastus == valik) {
                return true;
            }
        }
        return false;
    };

    return(
        <article className="kysimus">
            <p>{kysimus.kysimus_tekst}</p>
            <label>Vastus:</label>
            <div className="vastuse-valik-container" /*onChange={(e) => setVastus(e)}*/>
                {
                    kysimusteValikud.map((valik, index) => {
                        return (
                            <React.Fragment key={index}>
                                <label>{valik.valik_tekst}</label>
                                <input type="radio" value={valik.value} name={`vastus${kysimus.kysimus_id}`} onChange={(e) => setVastus(e)} checked={kasOnTaidetud(valik.value)}/>
                            </React.Fragment>
                        );
                    })
                }
            </div>
            {soovitused.length > 0 && kuvaSoovitused()}
        </article>
    );
}

export default Kysimus;
