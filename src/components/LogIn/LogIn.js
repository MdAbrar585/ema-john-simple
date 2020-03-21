import React from 'react';
import Auth from './useAuth';
import {Animated} from "react-animated-css";

const LogIn = () => {
    const auth = Auth();
    console.log(auth);
    return (
        <div>
            <h1>Join....</h1>
           {
           auth.user ? 
           <button className="btn btn-info" onClick={auth.signOut}>Sign Out</button>:
           <button className="btn btn-info" onClick={auth.signInWithGoogle}>Sign In With Google</button>
           }
        </div>
    );
};

export default LogIn;