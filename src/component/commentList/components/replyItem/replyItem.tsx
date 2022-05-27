import { Avatar, Divider, message } from "antd"
import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { likeIcon, likedIcon, commentIcon } from "@/icon"
import { UserOutlined } from '@ant-design/icons';
import { replyItem } from "@/api/comment";
import CommentContext from "@/context/commentContext";
import { fromNow } from "@/component/util";
import "./style.scss"
import useLove from "@/hooks/useLove";
interface ReplyItemProps {
    commentId: number;
    username: string;
    time: string;
    love: number;
    content: string;
    replyContent: string;
    replyId: number;
    replyTo: string;
    user_id: number
}

const ReplyItem: FC<ReplyItemProps> = ({
    commentId,
    user_id,
    username,
    replyTo,
    time,
    content,
    love,
    replyContent,
    replyId,
}) => {
    const [like, handleLike, count] = useLove("reply", replyId, love)
    const { type, setType, setCommentId, setReplyTo, catagory } = useContext(CommentContext);
    const addReply = () => {
        if (type === "comment") setType("reply");
        setCommentId(commentId);
        setReplyTo({ username, replyId });
        let clientHeight: number;
        if (catagory === "article") clientHeight = document.querySelector("#articleContainer").clientHeight;
        else clientHeight = document.querySelector("#formContainer").clientHeight;
        window.scrollTo({ top: clientHeight - 200,behavior:"smooth" });
    }
    return (
        <div styleName='replyContainer'>
            <div styleName='avatarContainer'>
                <Avatar icon={<UserOutlined />} size={30} />
            </div>
            <div styleName='mainContainer'>
                {replyId === 0 ?
                    <>
                        <div styleName='title'>
                            <span>{username}</span>
                            <Divider type='vertical' />
                            <span>{fromNow(time)}</span>
                        </div>
                        <div>{content}</div>
                        <div styleName='bottomContainer'>
                            <div styleName='flex_container'
                                onClick={handleLike}>
                                <span>{like ? likedIcon : likeIcon}</span>
                                <span>{count == 0 ? '点赞' : count}</span>
                            </div>
                            <div styleName='flex_container'
                                onClick={addReply}>
                                <span style={{ paddingTop: '2px', paddingLeft: '0.5rem' }}>{commentIcon}</span>
                                <span>回复</span>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div styleName='title'>
                            <span>{replyTo === null ? username : `${username} 回复 ${' '}${replyTo}`}</span>
                            <Divider type='vertical' />
                            <span>{fromNow(time)}</span>
                        </div>
                        <div styleName='contentContainer'>
                            {content}
                        </div>
                        <div styleName='replyedContainer'>
                            "{replyContent}"
                        </div>
                        <div styleName='bottomContainer'>
                            <div styleName='flex_container'
                                onClick={handleLike}>
                                <span>{like ? likedIcon : likeIcon}</span>
                                <span>{count == 0 ? '点赞' : count}</span>
                            </div>
                            <div styleName='flex_container'
                                onClick={addReply}>
                                <span style={{ paddingTop: '2px', paddingLeft: '0.5rem' }}>{commentIcon}</span>
                                <span>回复</span>
                            </div>
                        </div>
                    </>}

            </div>
        </div>
    )
}
export default ReplyItem