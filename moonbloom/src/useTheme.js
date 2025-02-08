import { useState, useContext, createContext } from "react";
import { userContext } from "./App";

const ThemeContext = createContext(null);

export function ThemeProvider({ database, children }) {
    const [darkMode, setDarkMode] = useState(false);
    
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return <ThemeContext.Provider value={{darkMode, toggleDarkMode, setDarkMode}}>
        {children}
    </ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
