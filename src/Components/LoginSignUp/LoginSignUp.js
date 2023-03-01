import React from 'react';
import Login from './Login';
import OverlayMessage from './OverlayMessage';
import SignUp from './SignUp';
import "./LoginSignUp.css";


function LoginSignUp() {
    return (
        <div>
            <SignUp />
            <Login />
            <OverlayMessage />
        </div>
    );
}

export default LoginSignUp;