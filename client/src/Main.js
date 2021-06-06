import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Profile from "./Profile";
import Kysimustik from "./Kysimustik";

const Main = (props) => {
    return(
        <main className="content-container">
            <Router>
                {props.children}
            </Router>
        </main>
    );
};

export default Main;