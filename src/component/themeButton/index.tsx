import { Theme } from "@/store/theme";
import { observer } from "mobx-react-lite"
import React from "react";
import { useState, useEffect } from "react";
import { moonIcon, sunIcon } from "../../icon"
import './style.scss'
export default observer((props: { themeStore: Theme }) => {
    const { themeStore } = props;
    const { theme, setTheme } = themeStore;
    useEffect(() => {
        const html = document.querySelector('html');
        html?.setAttribute('data-theme', theme);
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
            {theme === 'light' ?
                <div className='themeButton' onClick={handleClick}>
                    {moonIcon}
                </div>

                : <div className='themeButton' onClick={handleClick}>
                    {sunIcon}
                </div>}
        </div>
    )
})