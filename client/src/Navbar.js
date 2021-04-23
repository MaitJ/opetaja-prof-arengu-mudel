import React from 'react';
const Navbar = (props) => {
    return(
        <React.Fragment>
            <section className="navbar-logo">
                <img src="" alt="Logo"></img>
            </section>
            <section className="navbar-content-container">
                {props.children}
            </section>
        </React.Fragment>
    );
}

export default Navbar;