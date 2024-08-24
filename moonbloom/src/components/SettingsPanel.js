import React, { useState } from 'react';
import '../styles/SettingsPanel.css';

const SettingsPanel = ({ cycleLength, periodLength, saveSettings }) => {
    const [cycle, setCycle] = useState(cycleLength);
    const [period, setPeriod] = useState(periodLength);

    const handleSave = () => {
        saveSettings(cycle, period);
    };

    return (
        <div className="settings-panel">
            <label htmlFor="cycleLength">Cycle Length (days):</label>
            <input
                type="number"
                id="cycleLength"
                value={cycle}
                onChange={(e) => setCycle(parseInt(e.target.value))}
            />
            <label htmlFor="periodLength">Period Length (days):</label>
            <input
                type="number"
                id="periodLength"
                value={period}
                onChange={(e) => setPeriod(parseInt(e.target.value))}
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default SettingsPanel;
