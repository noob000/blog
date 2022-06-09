import React, { LegacyRef, RefObject, useEffect, useRef } from "react";
import './style.scss';
import ArticleItem from "./articleItem";
import api, { ArticleItemProps } from "@/api/api";
import useArticle from "@/hooks/useArticle";
import useVisible from "@/hooks/useVisible";
export default () => {
    const articleList = useArticle() as ArticleItemProps[];
    const lastItem = useRef<HTMLDivElement>(null)
    useVisible(lastItem)
    return (
        <div styleName='articlelist'>
            {articleList.length > 0
                && articleList.map((v, index) =>
                    index !== (articleList.length - 1) ?
                        <ArticleItem {...v} key={v.id} /> :
                        <div ref={lastItem}>
                            <ArticleItem {...v} key={v.id} />
                        </div>
                )}
        </div>
    )
}