import { Avatar, Divider, message } from "antd"

import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { likeIcon, likedIcon, commentIcon } from "@/icon"
import { UserOutlined } from '@ant-design/icons';
import { replyItem } from "@/api/comment";
import CommentContext from "../commentContext";
import { fromNow } from "@/component/util";

interface ReplyItemProps {
    commentId: number;
    username: string;
    time: string;
    love: number;
    content: string;
    replyContent: string;
    replyId: number;
    replyTo: string;
}
const ReplyItem: FC<ReplyItemProps> = ({ commentId, username, replyTo, time, content, love, replyContent, replyId }) => {
    const [like, setLike] = useState<boolean>(false);
    const handleLike = () => {

    }
    const { type, setType, setCommentId, setReplyTo } = useContext(CommentContext);
    const addReply = () => {
        if (type === "comment") setType("reply");
        setCommentId(commentId);
        setReplyTo({ username, replyId });
        const clientHeight = document.querySelector(".articleContainer").clientHeight;
        window.scrollTo({ top: clientHeight - 200 });
    }
    return (
        <div className='replyContainer'>
            <div className='avatarContainer'>
                <Avatar icon={<UserOutlined />} size={30} />
            </div>
            <div className='mainContainer'>
                {replyId === 0 ?
                    <>
                        <div className='title'>
                            <span>{username}</span>
                            <Divider type='vertical' />
                            <span>{fromNow(time)}</span>
                        </div>
                        <div>{content}</div>
                        <div className='bottomContainer'>
                            <div className='flex_container'
                                onClick={handleLike}>
                                <span>{like ? likedIcon : likeIcon}</span>
                                <span>{love == 0 ? '点赞' : love}</span>
                            </div>
                            <div className='flex_container'
                                onClick={addReply}>
                                <span style={{ paddingTop: '2px', paddingLeft: '0.5rem' }}>{commentIcon}</span>
                                <span>回复</span>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='title'>
                            <span>{replyTo === null ? username : `${username} 回复 ${' '}${replyTo}`}</span>
                            <Divider type='vertical' />
                            <span>{fromNow(time)}</span>
                        </div>
                        <div className='contentContainer'>
                            {content}
                        </div>
                        <div className='replyedContainer'>
                            "{replyContent}"
                        </div>
                        <div className='bottomContainer'>
                            <div className='flex_container'
                                onClick={handleLike}>
                                <span>{like ? likedIcon : likeIcon}</span>
                                <span>{love == 0 ? '点赞' : love}</span>
                            </div>
                            <div className='flex_container'
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