import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Switch, Link } from "react-router-dom";
import Profilecard from './Profilecard';
import { getAccessToken } from "./accessToken";
import jwtDecode from 'jwt-decode';
import {useUserContext} from './userContext';

const OppematerjalidKuvamine = () =>  {

    const {userId} = useUserContext();
    const [oppematerjalid, setOppematerjalid] = useState([]);
    const [haveData, setHaveData] = useState(false);
    const [isPdf, setIsPdf] = useState(false);

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
        {haveData ? oppematerjalid.map((oppematerjal, index) => {
            return (

                <div>
                    {/* <h3>{oppematerjal.oppematerjal_nimi}</h3> */}
                    <Link to={process.env.PUBLIC_URL + "uploads/files/" + oppematerjal.oppematerjal_failinimi} target="_blank">{oppematerjal.oppematerjal_nimi}</Link>
                    <h4>{oppematerjal.oppematerjal_kirjeldus}</h4>
                </div>
                
            );
        }): <h2>Sul ei ole veel õppematerjale lisatud!</h2>}

    <NavLink className="profile-button" to="/lisa-oppematerjal">Lisa õppematerjal</NavLink>
        

      
      </section>
  )
}  
export default OppematerjalidKuvamine;