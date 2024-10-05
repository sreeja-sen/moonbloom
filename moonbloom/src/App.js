import React, { useState } from 'react';
import Header from './components/Header';
import SettingsPanel from './components/SettingsPanel';
import KeyPanel from './components/KeyPanel';
import Calendar from './components/Calendar';
import LoginSignup from './components/LoginSignup';
import './styles/App.css';
import './index.css';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [keyPanelVisible, setKeyPanelVisible] = useState(false);
    const [cycleLength, setCycleLength] = useState(28);
    const [periodLength, setPeriodLength] = useState(5);
    const [periods, setPeriods] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSettings = () => {
        setSettingsVisible(!settingsVisible);
    };

    const toggleKeyPanel = () => {
        setKeyPanelVisible(!keyPanelVisible);
    };

    const saveSettings = (cycle, period) => {
        setCycleLength(cycle);
        setPeriodLength(period);
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
        <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
            {!isLoggedIn ? (
                <LoginSignup onLogin={handleLogin} />
            ) : (
                <>
                    <Header
                        toggleDarkMode={toggleDarkMode} 
                        toggleSettings={toggleSettings} 
                        toggleKeyPanel={toggleKeyPanel}
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
                    />
                    <button className="logout-button" onClick={handleLogout}>Log Out</button>
                </>
            )}
        </div>
    );
};

export default App;
