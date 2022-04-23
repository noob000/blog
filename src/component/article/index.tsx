import React, { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import './style/style.scss';
// import Comment_area from '../class_trash/commentarea';
import { observer } from "mobx-react-lite"
import { ArticleList } from '@/store/article';
import dayjs from 'dayjs';
import { articleLikeIcon, articleLikedIcon } from "@/icon"
import { message } from 'antd';
import api from '@/api/api';
import useThrottle from '@/hook/useThrottle';


interface ArticleProps {
    id: number;
    articleStore: ArticleList,
 
}

export default observer((props: ArticleProps) => {
    const { id, articleStore} = props;
    const [like, setLike] = useState<boolean>(false);
    const { getArticle } = articleStore;
    const fn = (state: boolean) => {
        let likeStr = localStorage.getItem("like");
        if (state) {
            let likeArr: any = likeStr.split(" ");
            likeArr = likeArr.filter((element: string) => element !== String(id));
            likeStr = likeArr.join(" ");
            localStorage.setItem("like", likeStr);
            api.updateArticleLike("minus", id).then(() => {
                setLike(false);
            })
        }
        else {
            if (!likeStr) {
                localStorage.setItem("like", String(id));
                api.updateArticleLike("add", id).then(() => {
                    setLike(true);
                })

            }
            else {
                let likeArr = likeStr.split(" ");
                likeArr.push(String(id));
                likeStr = likeArr.join(" ");
                localStorage.setItem("like", likeStr);
                api.updateArticleLike("add", id).then(() => {
                    setLike(true);
                })
            }
        }
    }
    const handleLike = useThrottle(fn);
    useLayoutEffect(() => {
        Prism.hooks.add("before-highlight", function (env) {
            env.code = (env.element as any).innerText;
        });
        Prism.highlightAll()
        // Prism.plugins.add
    }, [])
    const { article_content, catalogue, time } = getArticle(id);
    useEffect(() => {
        const likeStr = window.localStorage.getItem("like");
        if (likeStr) {
            const likeArr = likeStr.split(" ");
            if (likeArr.includes(String(id))) setLike(true)
        }
    }, [])
    console.log(article_content)
    return (
        <div>
            <div className='article_outconatiner'>
                <div>
                    <div className='articleContainer' dangerouslySetInnerHTML={{ __html: article_content }} />
                    <div>文章发布于：{dayjs(time).format("YYYY-MM-DD HH:MM")}</div>
                    <div className="article-icon" onClick={() => handleLike(like)}>{like ? articleLikedIcon : articleLikeIcon}</div>
                </div>
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