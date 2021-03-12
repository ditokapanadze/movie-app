import firebase from 'firebase'
import UserContext from "../UserContext"
import useAuth from "../hooks/UseAuth"



const socialMediaAuth = (provider) =>{
  
    return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res)=>{
        const token = res.user.refreshToken;
        localStorage.setItem('token', token);
        
    })
    .catch((error) =>{
        return error
    })
}


export default socialMediaAuth