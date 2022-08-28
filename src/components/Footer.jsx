import React from "react";

function Footer(){

    const currYear = new Date().getFullYear();

    return (
        <div className="footer">
            <p>Copyright ⓒ {currYear}.</p>
        </div>
    );
}

export default Footer;