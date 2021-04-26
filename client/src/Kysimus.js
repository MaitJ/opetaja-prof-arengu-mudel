import React, { useEffect, useState } from 'react';
import axios from 'axios';

const soovitusAPI = "http://localhost:3001/getSoovitused/";

const Kysimus = ({kysimus}) => {
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

    return(
        <article className="kysimus">
            <p>{kysimus.kysimus_tekst}</p>
            <label>Vastus:</label>
            <div className="vastuse-valik-container">
                <label>Halvasti</label>
                <input type="radio" value="1" name="vastus"/>
                <label>Keskmiselt</label>
                <input type="radio" value="2" name="vastus"/>
                <label>Hästi</label>
                <input type="radio" value="3" name="vastus"/>
            </div>
            {soovitused.length > 0 && kuvaSoovitused()}
        </article>
    );
}

export default Kysimus;