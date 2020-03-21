import React from 'react';
import Auth from './useAuth';
import {Animated} from "react-animated-css";

const LogIn = () => {
    const auth = Auth();
    const handleSignIn = () =>{
        auth.signInWithGoogle()
        .then(res => {
            // console.log("redirect Now");
            window.location.pathname = '/review';
        })
    }
    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname = '/shop';
            
        });
    }
    console.log(auth);
    return (
        <div>
            <h1>Join....</h1>
           {
           auth.user ? 
           <button className="btn btn-info" onClick={handleSignOut}>Sign Out</button>:
           <button className="btn btn-info" onClick={handleSignIn}>Sign In With Google</button>
           }
        </div>
    );
};

export default LogIn;