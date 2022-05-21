//逻辑：挂载时发送一次请求，获取评论区内容，用户每增加一条评论或者回复触发一次更新，发送请求将新的评论或者回复添加到数据库，并再次发送请求获取改变后的评论区内容。
import { useState } from "react";
import './style/comment.scss';
import { Input, Button, message } from 'antd';
import classname from 'classnames';
import moment from "moment";
import React from "react";
import { useThrottle } from "@/component/util";
import CommentList from '../component/commentList';
import { loginStateType } from './blog';
import request from "@/api/base";
import CommentArea from "@/component/commentList/components/textArea/index"
interface CommentProps {
    loginState: loginStateType | null
}
export default function Comment() {
    const { TextArea } = Input;
    const [inputData, setInput] = useState('');
    const [placeholder, setPlaceholder] = useState('请在此输入您的评论');
    const [replyTo, setReplyTo] = useState<any>(null)
    const [count, setCount] = useState(0);//用于判断用户添加回复和新评论后是否需要重新发送请求获取评论列表

    return (
        <div>
           <CommentArea/>
        </div>
    )
}