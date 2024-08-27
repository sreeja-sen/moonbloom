import React, { useState } from 'react';
import '../styles/LoginSignup.css';

const LoginSignup = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        const hardcodedEmail = 'moon@bloom.com';
        const hardcodedPassword = 'moonbloom123';

        if (email === hardcodedEmail && password === hardcodedPassword) {
            onLogin(true);
        } else {
            alert('Invalid email or password');
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
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
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
