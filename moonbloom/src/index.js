import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import { getDatabase } from "firebase/database"
import FirebaseApp from './firebase.js';
import { ThemeProvider } from './useTheme.js';

const database = getDatabase(FirebaseApp);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider database={database}>
      <App database={database}/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
