import React, { useEffect, useState, useContext } from 'react'
import { facebookProvider } from './config/authMethod';
import './nav.css'
import useAuth from "./hooks/UseAuth"
import UserContext from "./UserContext"
import socialMediaAuth from './service/auth'
import axios from 'axios'


function Nav() {

  const [userinfo, setUserinfo] = useState([])
  const {currentUser ,setCurrentUser} = useContext(UserContext)
    const [show, handleShow] = useState(false)  
    const {isLoggedIn} = useAuth()
    /* scroll eventListener fonr changing css */
    useEffect(() => {
      window.addEventListener("scroll",   () => {
        if (window.scrollY > 100) {
          handleShow(true);
        } else {
          handleShow(false);
        }
      });
      return () => {
        window.removeEventListener("scroll", () => {
          if (window.scrollY > 100) {
            handleShow(true);
          } else {
            handleShow(false);
          }
        })
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
    <p>Hi {userinfo.name}</p>
    <button onClick={logOut}>LOG OUT</button>
    </div>
  )
} 



// GETING USER INFO



  useEffect(()=>{
      const token = localStorage.getItem('token')
      axios.get(`https://graph.facebook.com/me?fields=name,picture&access_token=EAAa96yYOZASYBAPgYZC96WUoY8TbDovePyy7k2egEUnVsThKcq0Ur3YpTzR0vG0o0xZC4ZAob7vJpDoBlbCw15nVnWVohwpMDXomnnLOE5YWRyKqpffZACzJegwKmkDG4EaU8sZAbUXtO9B3J7a5DDCC8qXmcZC1TBG0kbCdfmMZCgZDZD`)
      .then(response => setUserinfo(response.data))
      .catch(error => console.log(error))
    }, [])
  

 
 
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
