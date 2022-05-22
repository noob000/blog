import React from "react";
import './style.scss';
import ArticleItem from "./articleItem";
import api, { ArticleItemProps } from "@/api/api";
import useArticle from "@/hooks/useArticle";
export default () => {
    const articleList = useArticle() as ArticleItemProps[];
    return (
        <div styleName='articlelist'>
            {articleList.length > 0
                && articleList.map((v) =>
                    <ArticleItem {...v} key={v.id} />
                )}
        </div>
    )
}