import { Avatar, Divider, message } from "antd"
import moment from "moment"
import React, { useEffect, useRef, useState } from "react"
import { likeIcon, likedIcon, commentIcon } from "@/icon"
import { UserOutlined } from '@ant-design/icons';
interface commentItemType {
    comment_id: number | null,
    username: string,
    time: string,
    content: string,
    love: number,
    reply: any[],
    user_id: number,
    liked?: boolean,
    addReply: Function
}
interface replyItemType {
    comment_id: number | null,
    username: string,
    time: string,
    content: string,
    love: number,
    replyTo: string,
    replyContent: string,
    user_id: number,
    addReply: Function
}
export default function CommentItem(props: commentItemType) {
    const { comment_id, username, time, content, love, reply, user_id, liked, addReply } = props;
    const [like, setLike] = useState<boolean>(liked ? true : false);
    const [count, setCount] = useState<number>(love)
    const l: number = reply.length;
    const handleLike = () => {
        const data = {
            username, user_id, comment_id,
            catagory: 'guestbook',
            method: like ? 'cancel' : 'add'
        }
        setLike(!like);
        setCount((prev) => !like ? prev + 1 : prev - 1)
        // post('/handleLike', data)
    }
    useEffect(() => {
        setLike(liked ? true : false)
    }, [liked]);

    return (
        l == 0
            ?
            <div className='commentContainer'>
                <div className='avatarContainer'>
                    <Avatar icon={<UserOutlined />} size={30} />
                </div>
                <div className='mainContainer'>
                    <div className='title'>
                        <span>{username}</span>
                        <Divider type='vertical' />
                        <span>{moment(time).fromNow()}</span>
                    </div>
                    <div className='contentContainer'>
                        {content}
                    </div>
                    <div className='bottomContainer'>
                        <div className='flex_container'
                            onClick={handleLike}>
                            <span>{like ? likedIcon : likeIcon}</span>
                            <span>{count == 0 ? '点赞' : count}</span>
                        </div>
                        <div className='flex_container'
                            onClick={() => addReply(username, comment_id)}>
                            <span style={{ paddingTop: '2px', paddingLeft: '0.5rem' }}>{commentIcon}</span>
                            <span>{l == 0 ? '回复' : l}</span>
                        </div>
                    </div>
                </div>
            </div>
            : <div>
                <div className='commentContainer'>
                    <div className='avatarContainer'>
                        <Avatar icon={<UserOutlined />} size={30} />
                    </div>
                    <div className='mainContainer'>
                        <div className='title'>
                            <span>{username}</span>
                            <Divider type='vertical' />
                            <span>{moment(time).fromNow()}</span>
                        </div>
                        <div className='contentContainer'>
                            {content}
                        </div>
                        <div className='bottomContainer'>
                            <div className='flex_container'
                                onClick={handleLike}>
                                <span>{like ? likedIcon : likeIcon}</span>
                                <span>{count == 0 ? '点赞' : count}</span>
                            </div>
                            <div className='flex_container'
                                onClick={() => addReply(username, comment_id)}>
                                <span style={{ paddingTop: '2px', paddingLeft: '0.5rem' }}>{commentIcon}</span>
                                <span>{l == 0 ? '回复' : l}</span>
                            </div>
                        </div>
                        <div className='replyList'>
                            {reply.map((element: any) => {
                                const replyItemProps = { ...element, comment_id, user_id }
                                return (
                                    <ReplyItem {...replyItemProps} />
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
    )
}
function ReplyItem({ comment_id, username, replyTo, time, content, love, replyContent, user_id, addReply }: replyItemType) {
    const [like, setLike] = useState<boolean>(false);
    const handleLike = () => {

    }

    return (
        <div className='replyContainer'>
            <div className='avatarContainer'>
                <Avatar icon={<UserOutlined />} size={30} />
            </div>
            <div className='mainContainer'>
                <div className='title'>
                    <span>{replyTo === null ? username : `${username} 回复 ${' '}${replyTo}`}</span>
                    <Divider type='vertical' />
                    <span>{moment(time).fromNow()}</span>
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
                        onClick={() => addReply(username, comment_id)}>
                        <span style={{ paddingTop: '2px', paddingLeft: '0.5rem' }}>{commentIcon}</span>
                        <span>回复</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

