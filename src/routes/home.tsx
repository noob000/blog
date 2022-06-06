import React, { useState } from "react";
import Articlelist from '../component/articlelist';
import './style/home.scss';
import articleStore from "@/store/article";
import IntroCard from "../component/intro_card/index"
export default function Home() {
    const [width, setWidth] = useState(window.innerWidth);
    window.onresize = () => {
        setWidth(window.innerWidth);
    }
    return (
        <div styleName='main_wrapper'>
            <div styleName='home_container'>

                <Articlelist/>
                <div styleName='cardContainer'>
                    <IntroCard/>
                </div>
            </div>
        </div>
    )
}