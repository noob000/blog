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
import CommentList from '../commentList';
import useLove from '@/hooks/useLove';
interface ArticleProps {
    id: number;
    articleStore: ArticleList,
}

const Article_Content = observer((props: ArticleProps) => {
    const { id, articleStore } = props;
    const { getArticle } = articleStore;
    const { article_content, catalogue, time } = getArticle(id);
    const [love, setLove] = useLove("article", id)
    useLayoutEffect(() => {
        Prism.highlightAll()
    }, [])
    return (
        <>
            <div styleName='article_outconatiner'>
                <div>
                    <div styleName='articleContainer'>
                        <div dangerouslySetInnerHTML={{ __html: article_content }} />
                        <div styleName='detail'>
                            <span>文章发布于：{dayjs(time).format("YYYY-MM-DD HH:MM")}</span>
                            <div styleName="article-icon" onClick={setLove}>{love ? articleLikedIcon : articleLikeIcon}</div>
                        </div>
                    </div>
                    <CommentList id={id} />
                </div>
                {
                    catalogue &&
                    <div styleName='relativeContainer'>
                        <div styleName="cataContainer">
                            <p styleName='cataTitle'>目录</p>
                            <div
                                style={{ paddingLeft: "10px" }}
                                dangerouslySetInnerHTML={{ __html: catalogue }} />
                        </div>

                    </div>
                }
            </div>

        </>
    )
})
export default ({ id }: { id: number }) =>
    <Article_Content id={id} articleStore={articleStore} />

