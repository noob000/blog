import React, { FC } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Divider } from 'antd';
import { dateIcon, commentIcon, visitIcon, likeIcon, folderIcon } from "../../../icon"
import api, { ArticleItemProps } from "@/api/api";
import dayjs from "dayjs";
import "./style.scss"
const ArticleItem: FC<ArticleItemProps> = ({ title, time, love, view, catagory, id, article_info, }) => {
    const updateView = () => api.updateView(id)
    const navigate = useNavigate();
    return (
        <div styleName='articleItem' onTouchStart={()=>{navigate(`/article/${id}`)}}>
            <div styleName="infor_container">
                <p>{title}</p>
                <p styleName='article_content'>{article_info}</p>
                <div styleName='bottom_container'>
                    <div styleName='iconContainer'>
                        <div styleName="flexContainer">
                            {dateIcon}
                            <span styleName='infor_number'>{dayjs(time).format("YYYY-MM-DD")}</span>
                            <Divider type="vertical" />
                        </div>
                        <div styleName="flexContainer">
                            {commentIcon}
                            <span styleName='infor_number' style={{ paddingBottom: '0.2rem' }}>{0}</span>
                            <Divider type="vertical" />
                            {visitIcon}
                        </div>
                        <div styleName="flexContainer">
                            <span styleName='infor_number' style={{ paddingBottom: '0.1rem' }}>{view}</span>
                            <Divider type="vertical" />
                        </div>
                        <div styleName="flexContainer">
                            {likeIcon}
                            <span styleName='infor_number'>{love}</span>
                        </div>
                        {catagory &&
                            <div styleName="catagory">
                                <div styleName="flexContainer ">
                                    <Divider type="vertical" />
                                    {folderIcon}
                                    <span styleName='infor_number'>{catagory.replaceAll(";", " ")}</span>
                                </div>
                            </div>}
                    </div>
                    <button styleName="read_button" onClick={updateView}><Link to={`/article/${id}`}>前往文章</Link></button>
                </div>
            </div>
        </div>
    )
}


export default ArticleItem