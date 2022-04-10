import React, { useState } from "react";
import Articlelist from '../component/articlelist';
import './style/home.scss';
import Lovecard from '../component/lovecard';
import articleStore from "@/store/article";

export default function Home() {
    const [width, setWidth] = useState(window.innerWidth);
    window.onresize = () => {
        setWidth(window.innerWidth);
    }
    return (
        <div className='main_wrapper'>
            <div className='home_container'>

                <Articlelist width={width} articleStore={articleStore} />
                <div className='cardContainer'>
                    <Lovecard />
                </div>
            </div>
        </div>
    )
}