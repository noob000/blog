//逻辑：挂载时发送一次请求，获取评论区内容，用户每增加一条评论或者回复触发一次更新，发送请求将新的评论或者回复添加到数据库，并再次发送请求获取改变后的评论区内容。
import './style/comment.scss';
import React from "react";
import { loginStateType } from './blog';
import CommentArea from "@/component/commentList/index"
interface CommentProps {
    loginState: loginStateType | null
}
export default function Comment() {

    return (
        <div styleName="commentWrapper">
            <CommentArea catagory={"list"} />
        </div>
    )
}