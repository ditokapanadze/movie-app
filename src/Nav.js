import React, { useEffect, useState } from 'react'
import './nav.css'
function Nav() {
    const [show, handleShow] = useState(false)  
   
    /* scroll eventListener fonr changing css */
    useEffect(() => {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          handleShow(true);
        } else {
          handleShow(false);
        }
      });
      return () => {
        window.removeEventListener("scroll");
      };
    }, []);


    return (
        <div className={`nav ${show ? "nav_black" : ""}`}>
            <img
             className="nav_logo"
             src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
             alt="netflix logo"
             />
            <img
             className="avatar"
             src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
             alt="netflix logo"
             />
        </div>
    )
}

export default Nav
