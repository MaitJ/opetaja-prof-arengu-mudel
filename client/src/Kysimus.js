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
        const kysimusSelector = "?kysimus=" + kysimus.id;
        axios.get(soovitusAPI + kysimusSelector).then((response) => {
            setSoovitused(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    const kuvaSoovitused = () => {
        return(
            <div className="soovitused-container">
                {
                    soovitused.map((soovitus, index) => {
                    return <p className="soovitus">{index}. {soovitus.soovitus_tekst}</p>;
                    })
                }
            </div>
        );
    }

    const setVastus = (e) => {
        const vastus = {
            kysimus_id: kysimus.id,
            vastus: e.target.value
        };
        setKysimusteVastused(prevState => {
            let newState = [...prevState];
            if (prevState[kysimus.id]) {
                newState[kysimus.id].vastus = vastus.vastus;
            } else {
                newState[kysimus.id] = vastus;
            }
            return newState;
        });
    };

    const kasOnTaidetud = (valik) => {
        if (kysimusteVastused !== undefined) {
            if (kysimusteVastused[kysimus.id].vastus == valik) {
                return true;
            }
        }
        return false;
    };

    return(
        <article className="kysimus">
            <p>{kysimus.kysimus_tekst}</p>
            <label>Vastus:</label>
            <div className="vastuse-valik-container" onChange={(e) => setVastus(e)}>
                {
                    kysimusteValikud.map((valik) => {
                        return (
                            <React.Fragment>
                                <label>{valik.valik_tekst}</label>
                                <input type="radio" value={valik.value} name={`vastus${kysimus.id}`} defaultChecked={kasOnTaidetud(valik.value)}/>
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