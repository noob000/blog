import React, { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import './style/style.scss';
// import Comment_area from '../class_trash/commentarea';
import { observer } from "mobx-react-lite"
import articleStore, { ArticleList } from '@/store/article';
import dayjs from 'dayjs';
import { articleLikeIcon, articleLikedIcon } from "@/icon"
import { Button, message } from 'antd';
import api from '@/api/api';
import useThrottle from '@/hook/useThrottle';
import "prismjs/plugins/line-numbers/prism-line-numbers";
import TextArea from 'antd/lib/input/TextArea';
import loginStore, { Login } from '@/store/login';
interface ArticleProps {
    id: number;
    articleStore: ArticleList,
    loginStore: Login
}

const Index = observer((props: ArticleProps) => {
    const { id, articleStore, loginStore } = props;
    const { getArticle } = articleStore;
    const { loginState: { isLogin } } = loginStore;
    const [like, setLike] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
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
    const { article_content, catalogue, time } = getArticle(id);
    const handleClick = () => {
        if (isLogin) message.warn("请先登录");
        else {

        }
    }
    useLayoutEffect(() => {
        Prism.highlightAll()
    }, [])
    useEffect(() => {
        const likeStr = window.localStorage.getItem("like");
        if (likeStr) {
            const likeArr = likeStr.split(" ");
            if (likeArr.includes(String(id))) setLike(true)
        }
    }, [])
    return (
        <div>
            <div className='article_outconatiner'>
                <div>
                    <div className='articleContainer'>
                        <div dangerouslySetInnerHTML={{ __html: article_content }} />
                        <div className='detail'>
                            <span>文章发布于：{dayjs(time).format("YYYY-MM-DD HH:MM")}</span>
                            <div className="article-icon" onClick={() => handleLike(like)}>{like ? articleLikedIcon : articleLikeIcon}</div>
                        </div>
                    </div>
                    <div>
                        <div style={{ width: "25rem" }}>
                            <TextArea rows={6} value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
                        </div>
                        <Button onClick={handleClick}>{isLogin ? "发表评论" : "请先登录"}</Button>
                    </div>
                </div>
                <div style={{ position: "relative" }}>
                    {catalogue && <div className="cataContainer">
                        <p className='cataTitle'>目录</p>
                        <div
                            style={{ paddingLeft: "10px" }}
                            dangerouslySetInnerHTML={{ __html: catalogue }} />
                    </div>}
                </div>

            </div>
        </div>
    )
})
export default ({ id }: { id: number }) => {
    return (
        <Index id={id} articleStore={articleStore} loginStore={loginStore} />
    )
}
