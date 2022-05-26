//逻辑：挂载时发送一次请求，获取评论区内容，用户每增加一条评论或者回复触发一次更新，发送请求将新的评论或者回复添加到数据库，并再次发送请求获取改变后的评论区内容。
import { useEffect, useState } from "react";
import './style/comment.scss';
import { Input, Button, message } from 'antd';
import classname from 'classnames';
import moment from "moment";
import React from "react";
import { useThrottle } from "@/component/util";
import { loginStateType } from './blog';
import request from "@/api/base";
import NewComment from "@/component/commentList/components/textArea/index"
import commentApi from "@/api/comment";
interface CommentProps {
    loginState: loginStateType | null
}
export default function Comment() {
    const [count, setCount] = useState(0);//用于判断用户添加回复和新评论后是否需要重新发送请求获取评论列表
    const [list, setList] = useState<any>([])
    useEffect(() => {
        commentApi.getListComment().then(({ data }) => {
            setList(data)
        })
    }, [count])
    return (
        <div styleName="commentWrapper">
            <NewComment />
        </div>
    )
}