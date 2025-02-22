import React from 'react';
import '../styles/KeyPanel.css';

const KeyPanel = () => {
    return (
        <div className="key-panel">
            <p><span className="normal-key"></span> Normal Day</p>
            <p><span className="period-key"></span> Period Day</p>
            <p><span className="ovulation-key"></span> Ovulation Day</p>
        </div>
    );
};

export default KeyPanel;
