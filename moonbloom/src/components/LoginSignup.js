import React, { useState, useMemo, useContext } from 'react';
import FirebaseApp from '../firebase.js';
import '../styles/LoginSignup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import { userContext } from '../App.js';

const LoginSignup = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('hello@gmail.com');
    const [password, setPassword] = useState('helloworld');

    const { setUserEmail, setUserID } = useContext(userContext);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const auth = useMemo(() => getAuth(FirebaseApp), []);

    const handleSubmit = () => {
        // const hardcodedEmail = 'moon@bloom.com';
        // const hardcodedPassword = 'moonbloom123';
        // hello@gmail.com
        // helloworld

        // login logic

        if (isLogin) {
            signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log(userCredential.user);
                onLogin(userCredential.user);
                setUserEmail(userCredential.user.email)
                setUserID(userCredential.user.uid)
            })
            .catch(error => {
                console.error(error);
                alert('Invalid email or password');
            });
        } else {
            createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log(userCredential.user);
                onLogin(userCredential.user);
            })
            .catch(error => {
                console.error(error);
                alert('Invalid email or password');
            });            
        }

    };

    return (
        <div className="login-signup-container">
            <div className="login-signup-box">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="password-toggle"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                >
                    <FontAwesomeIcon icon={faEye} />
                </button>
                <button onClick={handleSubmit}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
                <button
                    className="toggle-form-button"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin
                        ? "Don't have an account? Sign Up"
                        : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
};

export default LoginSignup;
