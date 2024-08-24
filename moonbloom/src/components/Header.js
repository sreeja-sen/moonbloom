import React from 'react';
import '../styles/Header.css';

const Header = ({ toggleDarkMode, toggleSettings, toggleKeyPanel }) => {
    return (
        <header>
            <div className="top-nav">
                <div className="nav-left">
                    <button onClick={toggleSettings}>⚙️</button>
                    <button onClick={toggleDarkMode}>🌙</button>
                    <button onClick={toggleKeyPanel}>🗝️</button>
                </div>
                <div className="logo">MoonBloom</div>
            </div>
        </header>
    );
};

export default Header;
