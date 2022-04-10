import React from "react";
import { useEffect, useState } from "react";
import './style.scss';
import '@/style/basic.scss';
import ArticleItem from "./articleItem";
import api, { ArticleItemProps } from "@/api/api";
import { observer } from "mobx-react-lite";
export default observer((props: any) => {
    const { width, articleStore } = props;
    const { refresh, articleList } = articleStore;
    const articlelist = () => {
        const result = [];
        for (let v of articleList.values()) {
            result.push(<ArticleItem {...v} key={v.id} />)
        }
        return result;
    }
    return (
        <div className='articlelist'>
            {articleList.size > 0 && articlelist()}
        </div>
    )
})