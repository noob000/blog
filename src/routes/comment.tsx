//逻辑：挂载时发送一次请求，获取评论区内容，用户每增加一条评论或者回复触发一次更新，发送请求将新的评论或者回复添加到数据库，并再次发送请求获取改变后的评论区内容。
import { useState } from "react";
import './style/comment.scss';
import { Input, Button, message } from 'antd';
import classnames from 'classnames';
import moment from "moment";
import React from "react";
import { useThrottle } from "@/component/util";
import CommentList from '../component/commentlist';
import { loginStateType } from './blog';
import request from "@/api/base";

interface CommentProps {
    loginState: loginStateType | null
}
export default function Comment({ loginState }: CommentProps) {
    const { TextArea } = Input;
    const [inputData, setInput] = useState('');
    const [placeholder, setPlaceholder] = useState('请在此输入您的评论');
    const [replyTo, setReplyTo] = useState<any>(null)
    const [count, setCount] = useState(0);//用于判断用户添加回复和新评论后是否需要重新发送请求获取评论列表

    const addReply = (username: any, comment_id: any) => {
        setReplyTo({ username, comment_id })
        setPlaceholder(`回复@:${username}`);
    }
    const buttValue = () => {
        if (loginState === null) {
            return '请先登录';
        }
        else {
            if (replyTo === null) return '点击发表您的评论';
            else return '点击发表您的回复'
        }
    }
    const throttleWarn = useThrottle(2000, () => {
        message.warn('请输入您要发布的评论')
    })
    const addComment = () => {
        if (loginState === null) {

        }
        if (replyTo === null) {
            if (inputData !== '') {
                const data = {
                    username: loginState?.username,
                    user_id: loginState?.user_id,
                    time: moment(),
                    content: inputData
                }
                request.post('/addnewcomment', data).then((res) => {
                    if (res.data === 'success') {
                        message.success('发布评论成功');
                        setInput('');
                        setCount(prev => prev + 1)
                    }
                })
            }
            else throttleWarn()


        }
        else {
            request.post('/addnewreply', {
                username: loginState?.username,
                user_id: loginState?.user_id,
                time: moment(),
                content: inputData,
                replyTo: replyTo.username,
                comment_id: replyTo.comment_id,
            }).then((res) => {
                console.log(res.data)
            })
        }


    }
    return (
        <div className='comment_wrapper'>
            <div className='commentInput'>
                <div className='flexContainer'>
                    <button onClick={() => {
                        setReplyTo(null)
                        setPlaceholder('请在此输入您的评论')
                    }}
                        className={classnames({
                            cancelReply: true,
                            display: (replyTo === null)
                        })}
                    >取消回复</button>
                    <TextArea
                        value={inputData}
                        placeholder={placeholder}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        onChange={(event: any) => setInput(event.target.value)} />

                    <button onClick={addComment}>{buttValue()}</button>
                </div>
            </div>
            <CommentList
                url={'http://localhost:3666/getcommentlist'}
                count={count}
                addReply={addReply}
                loginState={loginState} />
        </div>
    )
}