import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import './style/style.scss';
import "./style/highlight.css";
import dayjs from 'dayjs';
import { articleLikeIcon, articleLikedIcon } from "@/icon"
import api, { ArticleItemProps } from '@/api/api';
import CommentList from '../commentList';
import useLove from '@/hooks/useLove';
import useArticle from '@/hooks/useArticle';

const Article_Content: FC<{ id: number }> = ({ id }) => {
    const { article_content, catalogue, time } = useArticle(id) as ArticleItemProps
    const [love, setLove] = useLove("article", id)
    useLayoutEffect(() => {
        Prism.highlightAll()
    }, [])
    return (
        <>
            <div styleName='article_outconatiner'>
                <div>
                    <div styleName='articleContainer' id="articleContainer">
                        <div dangerouslySetInnerHTML={{ __html: article_content }} />
                        <div styleName='detail'>
                            <span>文章发布于：{dayjs(time).format("YYYY-MM-DD HH:MM")}</span>
                            <div styleName="article-icon" onClick={setLove}>{love ? articleLikedIcon : articleLikeIcon}</div>
                        </div>
                    </div>
                    <CommentList id={id} catagory="article"/>
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
}
export default Article_Content

