import firebase from 'firebase'
import UserContext  from "../UserContext"
import useAuth from "../hooks/UseAuth"
import react,{useState} from 'react'



const socialMediaAuth = (provider) =>{
    return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res)=>{
        const token = res.user.refreshToken;
        localStorage.setItem('token', token);
       console.log(res)
    })
    .catch((error) =>{
        return error
    })
}


export default socialMediaAuth