import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import './style/style.scss';
import "./style/highlight.css";
import { observer } from "mobx-react-lite"
import articleStore, { ArticleList } from '@/store/article';
import dayjs from 'dayjs';
import { articleLikeIcon, articleLikedIcon } from "@/icon"
import api from '@/api/api';
import useThrottle from '@/hooks/useThrottle';
import "prismjs/plugins/line-numbers/prism-line-numbers";
import TextArea from 'antd/lib/input/TextArea';
import loginStore, { Login } from '@/store/login';
import CommentList from '../commentlist';
import LoginContext from '../../context/loginContext';
interface ArticleProps {
    id: number;
    articleStore: ArticleList,
    loginStore: Login
}

const Article_Content = observer((props: ArticleProps) => {
    const { id, articleStore, loginStore } = props;
    const { getArticle } = articleStore;
    const { isLogin, articleLike } = loginStore;
    const [like, setLike] = useState<boolean>(false);
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

    useLayoutEffect(() => {
        Prism.highlightAll()
    }, [])
    useEffect(() => {
        if (articleLike) setLike(articleLike.has(String(id)))
    }, [articleLike])
    const updateLove = () => {

    }
    return (
        <div>
            <LoginContext.Provider value={{ loginStore: loginStore }}>
                <div styleName='article_outconatiner'>
                    <div>
                        <div styleName='articleContainer'>
                            <div dangerouslySetInnerHTML={{ __html: article_content }} />
                            <div styleName='detail'>
                                <span>文章发布于：{dayjs(time).format("YYYY-MM-DD HH:MM")}</span>
                                <div styleName="article-icon" onClick={() => handleLike(like)}>{like ? articleLikedIcon : articleLikeIcon}</div>
                            </div>
                        </div>
                        <CommentList id={id} />
                    </div>
                    <div style={{ position: "relative" }}>
                        {catalogue && <div styleName="cataContainer">
                            <p styleName='cataTitle'>目录</p>
                            <div
                                style={{ paddingLeft: "10px" }}
                                dangerouslySetInnerHTML={{ __html: catalogue }} />
                        </div>}
                    </div>

                </div>
            </LoginContext.Provider>
        </div>
    )
})
export default ({ id }: { id: number }) =>
    <Article_Content id={id} articleStore={articleStore} loginStore={loginStore} />

