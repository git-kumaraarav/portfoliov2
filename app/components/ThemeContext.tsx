"use client"; 
import React from "react";
const themeset = ['indigo', 'paper', 'midnight', 'mono', 'sunset'];

const ThemeContext = ({children}:{children?: React.ReactNode}) => {

    const [theme, setTheme] = React.useState(0);
    const ToggleTheme = () => {
        setTheme((theme + 1) % themeset.length);
    }
    
    
    return (
        <>
        </>
    )
}
