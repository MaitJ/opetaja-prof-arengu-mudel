import React, {useState, useRef} from 'react';
import env from 'react-dotenv';
require('dotenv').config();
const Contact = () => {
    const [status, setStatus] = useState("Submit");
    const [msgStatus, setMsgStatus] = useState(false);
    const [contactMessage, setContactMessage] = useState('Something went wrong');


    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus("Sending...");
        const {name, email, message} = e.target.elements;
        let details = {
            name: name.value,
            email: email.value,
            message: message.value,
        };
        let response = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });
      setStatus("Submit");
      let result = await response.json();
      console.log(result.status);
      if(result.status == "Message Sent") {
        setContactMessage('Kiri saadetud!');
        setMsgStatus(true);

      };
    };

    return(
        
        <form onSubmit={handleSubmit}>
        
            <section className='contact'>
                <section className='contact-heading'>
                    <h1>Kontakteeru meiega!</h1>
                </section>
                <section className="contact-form">
                    <label>Nimi</label>
                    <input type="text" id='name' name='name' placeholder='Nimi' required/>
                    <label>Email</label>
                    <input type="email" id='email' name='email' placeholder='E-mail'/>
                    <label>Teema</label>
                    <textarea id="s6num" name="s6num" rows="6" cols="80"></textarea>
                    <button className="contact-button" type='submit' id='button' value='Submit'>Saada</button>
                </section>
            </section>
        </form>
        
    );
}

export default Contact;