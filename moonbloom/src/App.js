import React, { useState, createContext, useMemo } from 'react';

import Header from './components/Header';
import SettingsPanel from './components/SettingsPanel';
import KeyPanel from './components/KeyPanel';
import Calendar from './components/Calendar';
import LoginSignup from './components/LoginSignup';
import { useTheme } from './useTheme';
import './styles/App.css';
import './index.css';

export const userContext = createContext({});

const App = ({ database }) => {
    const { darkMode } = useTheme();
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [keyPanelVisible, setKeyPanelVisible] = useState(false);
    const [cycleLength, setCycleLength] = useState(28);
    const [periodLength, setPeriodLength] = useState(5);
    const [periods, setPeriods] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUserID] = useState("")
    const [email, setUserEmail] = useState("")


    const toggleSettings = () => {
        setSettingsVisible(!settingsVisible);
    };

    const toggleKeyPanel = () => {
        setKeyPanelVisible(!keyPanelVisible);
    };

    const saveSettings = (cycle, period) => {
        setCycleLength(cycle);
        setPeriodLength(period);
        toggleSettings();
    };

    const addPeriod = (date) => {
        setPeriods([...periods, date].sort());
    };

    const removePeriod = (date) => {
        setPeriods(periods.filter(d => d !== date));
    };

    const handleLogin = (status) => {
        setIsLoggedIn(status);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    
    return (
        <userContext.Provider value={{ isLoggedIn, uid, email, setUserID, setUserEmail, handleLogout }} >
            <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
                {!isLoggedIn ? (
                    <LoginSignup onLogin={handleLogin} />
                ) : (
                    <>
                        <Header
                            toggleSettings={toggleSettings} 
                            toggleKeyPanel={toggleKeyPanel}
                            database={database}
                        />
                        
                        
                        
                        {settingsVisible && <SettingsPanel
                            cycleLength={cycleLength}
                            periodLength={periodLength}
                            saveSettings={saveSettings}
                        />}

                        {keyPanelVisible && <KeyPanel />}
                        
                        <Calendar 
                            periods={periods} 
                            cycleLength={cycleLength} 
                            periodLength={periodLength} 
                            addPeriod={addPeriod} 
                            removePeriod={removePeriod}
                            setPeriods={setPeriods}
                            database={database} 
                        />
                    </>
                )}
            </div>
        </userContext.Provider>
    );
};

export default App;
