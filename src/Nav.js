import React, { useEffect, useState, useContext } from 'react'
import { facebookProvider } from './config/authMethod';
import './nav.css'
import useAuth from "./hooks/UseAuth"
import UserContext from "./UserContext"
import socialMediaAuth from './service/auth'



function Nav() {

  const [sacdeli, setSacdeli] = useState(true)
  const {currentUser ,setCurrentUser} = useContext(UserContext)
    const [show, handleShow] = useState(false)  
    const {isLoggedIn} = useAuth()
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

    const handleOnClick = async (provider) =>{
      const  res = await socialMediaAuth(provider)
      setCurrentUser( localStorage.getItem('token'))
    }
  

 const logOut = () =>{
  localStorage.removeItem("token");
  setCurrentUser('')
 }

const User =() =>{
  return(
    <div className="avatar"> 
    <p>Hello user</p>
    <button onClick={logOut}>LOG OUT</button>
    </div>
  )
} 

    return (
        <div className={`nav ${show ? "nav_black" : ""}`}>
            <img
             className="nav_logo"
             src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
             alt="netflix logo"
             />
             {currentUser ?( 
             <User />
             
             ) : (
               <button onClick={() =>handleOnClick(facebookProvider)} className="avatar">Login with Facebok</button>
             )}
           
        </div>
    )
}

export default Nav
