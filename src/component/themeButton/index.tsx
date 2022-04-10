import React from "react";
import { useState, useEffect } from "react";
import { moonIcon, sunIcon } from "../../icon"
import './style.scss'
export default function ThemeButton() {
    const [theme, setTheme] = useState<string>('light');
    useEffect(() => {
        const html = document.querySelector('html');
        const hour = new Date().getHours();
        if (hour >= 20 || hour <= 4) {
            setTheme('dark')
            html?.setAttribute('data-theme', 'dark');
        }
    }, [])
    const handleClick = () => {
        const html = document.querySelector('html');
        if (theme === 'dark') {
            setTheme('light');
            html?.setAttribute('data-theme', 'light');
        }
        else if (theme === 'light') {
            setTheme('dark');
            html?.setAttribute('data-theme', 'dark');
        }
    }
    return (
        <div>
            {theme == 'light' ?
                <div className='themeButton' onClick={handleClick}>
                    {moonIcon}
                </div>

                : <div className='themeButton' onClick={handleClick}>
                    {sunIcon}
                </div>}
        </div>
    )
}