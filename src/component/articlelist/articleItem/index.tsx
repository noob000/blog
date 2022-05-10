import React, { FC } from "react";
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import { dateIcon, commentIcon, visitIcon, likeIcon, folderIcon } from "../../../icon"
import api, { ArticleItemProps } from "@/api/api";
import dayjs from "dayjs";
const ArticleItem: FC<ArticleItemProps> = ({ title, article_content, time, love, view, catagory, id, article_info, }) => {
    const updateView = () => api.updateView(id)

    return (
        <div className='listitem_container'>
            <div className="infor_container">
                <p className='article_title'>{title}</p>
                <p className='article_content'>{article_info}</p>
                <div className='bottom_container'>
                    <div className='iconContainer'>
                        {dateIcon}
                        <span className='infor_number'>{dayjs(time).format("YYYY-MM-DD")}</span>
                        <Divider type="vertical" />
                        {commentIcon}
                        <span className='infor_number' style={{ paddingBottom: '0.2rem' }}>{0}</span>
                        <Divider type="vertical" />
                        {visitIcon}
                        <span className='infor_number' style={{ paddingBottom: '0.1rem' }}>{view}</span>
                        <Divider type="vertical" />
                        {likeIcon}
                        <span className='infor_number'>{love}</span>
                        {catagory &&
                            <>
                                <Divider type="vertical" />
                                {folderIcon}
                                <span className='infor_number'>{catagory.replaceAll(";", " ")}</span>
                            </>
                        }
                    </div>
                    <button className="read_button" onClick={updateView}><Link to={`/article/${id}`}>前往文章</Link></button>
                </div>
            </div>


        </div>
    )
}


export default ArticleItem