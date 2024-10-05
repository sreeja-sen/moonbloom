import React from 'react';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faMoon, faKey } from '@fortawesome/free-solid-svg-icons';

const Header = ({ toggleDarkMode, toggleSettings, toggleKeyPanel }) => {
    return (
        <header>
            <div className="top-nav">
                <div className="nav-left">
                    <button onClick={toggleSettings}>
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                    <button onClick={toggleDarkMode}>
                        <FontAwesomeIcon icon={faMoon} />
                    </button>
                    <button onClick={toggleKeyPanel}>
                        <FontAwesomeIcon icon={faKey} />
                    </button>
                </div>
            </div>
            <div className="logo">MoonBloom</div>
        </header>
    );
};

export default Header;
