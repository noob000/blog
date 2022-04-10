import React, { useEffect, useState, useContext } from "react";
import './style.scss';
import CommentItem from './item/index';
// import { loginStateType } from '../page/blog';
import request from "@/api/base";
interface CommentListProps {
    url: string;
    count: number;
    loginState: any;
    addReply: Function
}
export default function CommentList({ loginState, url, addReply, count }: CommentListProps) {
    const [commentList, setCommentList] = useState<any>([]);
    const [likeSet, setLikeSet] = useState<any>(new Set())
    useEffect(() => {
        if (loginState === null) {
            request.get(url)
                .then((res) => {
                    setCommentList(res.data.data.reverse())
                })
        }
        else {
            request.post(
                url,
                {
                    user_id: loginState.user_id
                }
            ).then((res) => {
                const { data, user_like } = res.data;
                setCommentList(data.reverse());
                let set = new Set(user_like);
                setLikeSet(set);
            }).catch((err) => {
                throw err
            })
        }

    }, [url, count, loginState])
    const prodList = () => commentList.length > 0 ?
        commentList.map((element: any) => {
            const { id, username, time, love, content, reply } = element;
            if (likeSet.size == 0)
                return (
                    <CommentItem
                        comment_id={id}
                        username={username}
                        time={time}
                        love={love}
                        content={content}
                        reply={reply}
                        user_id={loginState ? loginState.user_id : null}
                        addReply={addReply}
                    />
                )
            else {

                return likeSet.has(id) ? <CommentItem
                    comment_id={id}
                    username={username}
                    time={time}
                    love={love}
                    content={content}
                    reply={reply}
                    liked
                    user_id={loginState ? loginState.user_id : null}
                    addReply={addReply}
                />
                    : <CommentItem
                        comment_id={id}
                        username={username}
                        time={time}
                        love={love}
                        content={content}
                        reply={reply}
                        user_id={loginState ? loginState.user_id : null}
                        addReply={addReply}
                    />
            }
        })
        : []

    return (
        <div className='commentList'>
            {prodList()}
        </div>
    )
}