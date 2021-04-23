import React, {useEffect, useState} from 'react';
import Kysimus from './Kysimus';

const kuvamiseLimit = 10;

const Kysimusteplokk = ({kysimused}) => {
    const [kasOnAlamPlokke, setKasOnAlamPlokke] = useState(false);
    const [kuvatavadKysimused, setKuvatavadKysimused] = useState([]);
    const [selectedAlamPlokk, setSelectedAlamPlokk] = useState(0);
    const [kysimusedAlamPlokkidena, setKysimusedAlamPlokkidena] = useState([]);
    const [mituAlamPlokki, setMituAlamPlokki] = useState(0);


    useEffect(() => {
        if (kysimused.length > kuvamiseLimit) {
            setKysimusedAlamPlokkidena(jagaKysimusedAlamplokkideks());
            setKasOnAlamPlokke(true);
        } else {
            setKuvatavadKysimused(kysimused);
        }
    }, [])

    useEffect(() => {
        if (kasOnAlamPlokke) {
            const kuvatavPlokk = kysimusedAlamPlokkidena.filter((kysimus) => kysimus.alamplokk_id === selectedAlamPlokk);
            setKuvatavadKysimused(kuvatavPlokk);
        }
    }, [selectedAlamPlokk, kasOnAlamPlokke]);


    const jagaKysimusedAlamplokkideks = () => {
        const tempKysimused = kysimused;
        const mituPlokki = Math.ceil(tempKysimused.length / kuvamiseLimit);
        setMituAlamPlokki(mituPlokki);
        let kuvatavadKysimused = [];
        for (let i = 0; i < mituPlokki; ++i) {
            for (let j = 0; j < kuvamiseLimit; ++j) {
                if (kysimused[j] !== undefined) {
                    kuvatavadKysimused = [...kuvatavadKysimused, {...tempKysimused[j], alamplokk_id:i}];
                }
            }
            if (tempKysimused.length > kuvamiseLimit) {
                tempKysimused.splice(0, 10);
            }
        }
        return kuvatavadKysimused;
    }

    const displayButtons = () => {
        if (selectedAlamPlokk === 0) {
            return <button onClick={() => setSelectedAlamPlokk(selectedAlamPlokk + 1)}>Jargmine alamplokk</button>;
        } else if (selectedAlamPlokk === mituAlamPlokki - 1) {
            return <button onClick={() => setSelectedAlamPlokk(selectedAlamPlokk - 1)}>Eelmine alamplokk</button>;
        } else {
            return(
                <React.Fragment>
                    <button onClick={() => setSelectedAlamPlokk(selectedAlamPlokk - 1)}>Eelmine alamplokk</button>
                    <button onClick={() => setSelectedAlamPlokk(selectedAlamPlokk + 1)}>Jargmine alamplokk</button>
                </React.Fragment>
            );
        }
    };

    return(
        <div className="kysimusteplokk-container">
            {kuvatavadKysimused.map((kysimus, index) => {
                return(
                    <Kysimus kysimus={kysimus} key={kysimus.id}/>
                );
            })}
            {kasOnAlamPlokke && displayButtons()}
        </div>
    );
}

export default Kysimusteplokk;