import React from 'react';
import '../styles/Header.css';
import { useContext, useEffect } from 'react';
import { userContext } from '../App';
import { useTheme } from '../useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear, faMoon, faKey } from '@fortawesome/free-solid-svg-icons';
import { ref, set, get, update } from "firebase/database";


const Header = ({ toggleSettings, toggleKeyPanel, database }) => {
    const { toggleDarkMode, darkMode, setDarkMode } = useTheme();
    const { handleLogout } = useContext(userContext);
    const { uid } = useContext(userContext)
    
    // upload darkMode preference to database on changed preference
    useEffect(() => {
        console.log(database, uid)
        if (database && uid && darkMode !== null) {
            const updates = {
                "metadata": {
                    darkMode
                }
            }
            update(ref(database, uid), updates)
        }
    }, [database, uid, darkMode]);

    // download darkMode preference from database on app load
    useEffect(() => {
        if (database && uid) {
            get(ref(database, uid + "/metadata")).then(snapshot => {
                const result = snapshot.val();
                setDarkMode(result.darkMode);
            }).catch(error => {
                // handle the error if metadata table doesn't exist, and create
                // it in the database
                set(ref(database, uid + "/metadata"), { darkMode: false })
            })
        }
    }, [database, uid]);

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
            <button className="logout-button" onClick={handleLogout}>Log Out</button>
        </header>
    );
};

export default Header;
