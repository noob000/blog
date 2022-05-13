import React, { useState } from "react";
import Articlelist from '../component/articlelist';
import './style/home.scss';
import Lovecard from '../component/lovecard';
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

                <Articlelist width={width} articleStore={articleStore} />
                <div styleName='cardContainer'>
                    <Lovecard />
                    <IntroCard/>
                </div>
            </div>
        </div>
    )
}