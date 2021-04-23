import React from 'react';

const Kysimus = ({kysimus}) => {

    return(
        <article className="kysimus">
            <form>
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
            </form>
        </article>
    );
}

export default Kysimus;