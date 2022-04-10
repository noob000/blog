import React, { useEffect, useLayoutEffect, useState } from 'react';
import Prism from 'prismjs';
import "./highlight.css"
import './style.scss';
// import Comment_area from '../class_trash/commentarea';

import { observer } from "mobx-react-lite"
export default observer((props: any) => {
    const { id, articleStore } = props;
    const { getArticle } = articleStore;
    useLayoutEffect(() => {
        Prism.highlightAll()
    }, [])
    const { article_content, catalogue } = getArticle(id);
    return (
        <div>
            <div className='article_outconatiner'>
                <div className='articleContainer' dangerouslySetInnerHTML={{ __html: article_content }} />
                <div style={{ position: "relative" }}>
                    {catalogue && <div className="cataContainer">
                        <p className='cataTitle'>目录</p>
                        <div dangerouslySetInnerHTML={{ __html: catalogue }} />
                    </div>}
                </div>
                {/* <Comment_area commentList={getcommentlist()} /> */}
            </div>
        </div>
    )
})

// const handleHtmlStr = (htmlStr: string) => {
//     const reg1 = /<h.>.*?\<\/h.>/gi;
//     const titleArr = [...htmlStr.matchAll(reg1)].map((element) => element[0]);
//     const reg2 = /(?<=<h.>).*?(?=<\/h.>)/gi;

//     const linkedTitle = titleArr.map((element: string, index) => {
//         if (element.includes("<h1>")) return element.replace("<h1>", `<h1 id='header${index}' >`);
//         else if (element.includes("<h2>")) return element.replace("<h2>", `<h2 id='header${index}' >`);
//         else if (element.includes("<h3>")) return element.replace("<h3>", `<h3 id='header${index}' >`);
//         else if (element.includes("<h4>")) return element.replace("<h4>", `<h4 id='header${index}' >`);
//     })
//     let cataContent: string = "";
//     titleArr.forEach((element: string, index) => {
//         const content = [...element.matchAll(reg2)][0];
//         if (element.includes("<h1>")) cataContent += `<p><a href='#header${index}' >${content}</a><p>`
//         else if (element.includes("<h2>")) cataContent += `<p><a href='#header${index}' style="padding-left:20px;">${content}</a><p>`
//         else if (element.includes("<h3>")) cataContent += `<p><a href='#header${index}' style="padding-left:40px;">${content}</a><p>`
//     });
//     let temp = htmlStr
//     for (let i = 0, l = titleArr.length; i < l; i++) {

//         temp = temp.replace(titleArr[i], linkedTitle[i])
//     }
//     return [temp, cataContent]

// }