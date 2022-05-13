import { observer } from "mobx-react-lite"
import React from "react";
import { useState, useEffect } from "react";
import { moonIcon, sunIcon } from "../../icon"
import './style.scss'
export default () => {
    const [theme, setTheme] = useState<"dark" | "light">("light");
    useEffect(() => {
        const html = document.querySelector('html');
        const hour = new Date().getHours();
        if (hour > 20 || hour < 7)
            html?.setAttribute('data-theme', "dark");
        else
            html?.setAttribute('data-theme', "light");
    }, [])
    const handleClick = () => {
        const html = document.querySelector('html');
        const theme = html.getAttribute("data-theme")
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
            {theme === 'light' ?
                <div styleName='themeButton' onClick={handleClick}>
                    {moonIcon}
                </div>

                : <div styleName='themeButton' onClick={handleClick}>
                    {sunIcon}
                </div>}
        </div>
    )
}