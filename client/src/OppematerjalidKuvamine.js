import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Switch, Link } from "react-router-dom";
import Profilecard from './Profilecard';
import { getAccessToken } from "./accessToken";
import jwtDecode from 'jwt-decode';
import {useUserContext} from './userContext';
import { BiChevronRight } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';

const OppematerjalidKuvamine = () =>  {

    const {userId} = useUserContext();
    const [oppematerjalid, setOppematerjalid] = useState([]);
    const [haveData, setHaveData] = useState(false);
    const [isPdf, setIsPdf] = useState(false);

    const linkStyle = {
        textDecoration: "none",
        fontSize: "2em",
        color: "rgb(18, 18, 18)",
        fontWeight: "bold",
    };

    const addEducationalStyle = {
        textDecoration: "none",
        fontSize: "1.5em",
        color: "#fff",
        borderRadius: "15px",
        backgroundColor: "#459157",
        padding: "1em"
    }


    useEffect(() => {
        if(userId !== undefined) {
            axios.post('http://localhost:3001/getOppematerjalid', {
                kasutajaid: userId
            }).then((response) => {
                //console.log("RESPUNSE: " + JSON.stringify(response.data));
                //console.log("RAW: " + response.data[0].oppematerjal_id);
                setOppematerjalid(response.data);
            })
        }

        
        
    }, [userId])

    useEffect(() => {
        if(oppematerjalid !== undefined && oppematerjalid[0] !== undefined) {
            setHaveData(true);
            console.log("failinimi: " + oppematerjalid[0].oppematerjal_failinimi);
            console.log("length: " + oppematerjalid[0].oppematerjal_failinimi.length);
            console.log(oppematerjalid[0].oppematerjal_failinimi.substring(oppematerjalid[0].oppematerjal_failinimi.length - 4, oppematerjalid[0].oppematerjal_failinimi.length));
            if(oppematerjalid[0].oppematerjal_failinimi.substring(oppematerjalid[0].oppematerjal_failinimi.length - 4, oppematerjalid[0].oppematerjal_failinimi.length) == ".pdf") {
                setIsPdf(true);
            }
        }
    }, [oppematerjalid])


    
    // console.log(oppematerjalid[0].oppematerjal_failinimi);
  
    return (
      <section className="profile-oppematerjal">
        <Switch>
            <Profilecard/>
        </Switch>
        <div className="educational-top">
            <div>
                <NavLink className="add-educational" style={addEducationalStyle} to="/lisa-oppematerjal">Lisa õppematerjal</NavLink>
            </div>
            <div id="educational-content">
            {haveData ? oppematerjalid.map((oppematerjal, index) => {
                return (
                    <div className="educational-wrapper">
                        <div className="educational-docs">
                            {/* <h3>{oppematerjal.oppematerjal_nimi}</h3> */}
                     
                            <div className="educational-1">
                                <div className="educational-0">
                                    <button id="educational-delete"><ImCross /></button>
                                </div>
                                <div>
                                    <Link to={process.env.PUBLIC_URL + "uploads/files/" + oppematerjal.oppematerjal_failinimi} target="_blank" className="educational-title" style={linkStyle}>{oppematerjal.oppematerjal_nimi}</Link>
                                    <p id="educational-desc">{oppematerjal.oppematerjal_kirjeldus}</p>
                                </div>
                            </div>
                            <div className="educational-2">
                                <BiChevronRight id="educational-icon"/>
                            </div>
                        </div>
                    </div>   
                );
            }): <h2>Sul ei ole veel õppematerjale lisatud!</h2>}
            </div>
        </div>
         
      </section>
  )
}  
export default OppematerjalidKuvamine;