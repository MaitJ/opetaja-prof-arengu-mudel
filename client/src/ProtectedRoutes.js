import React from "react";
import { Redirect, Route } from "react-router-dom";


function ProtectedRoute({ component: Component, ...restOfProps }) {



    return (
      <Route
        {...restOfProps}
        render={(props) =>
            // {accessToken != "" ? (<button onClick={async () => {await logout(); setAccessToken(""); setUserEmail(""); console.log(accessToken + "See on getaccestoken")}}>Logi valja</button>) : null}
          123 ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  }
  
  export default ProtectedRoute;