import { Avatar, Divider, message } from "antd"
import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { likeIcon, likedIcon, commentIcon } from "@/icon"
import { UserOutlined } from '@ant-design/icons';
import commentApi, { replyItem } from "@/api/comment";
import CommentContext from "@/context/commentContext";
import { fromNow } from "@/component/util";
import "./style.scss"
import useLogin from "@/hooks/useLogin";
import { observer } from "mobx-react-lite";
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
    const [like, setLike] = useState<boolean>(false);
    const { isLogin, userId, replyLike, openModal, updateReplyLike } = useLogin();
    const [count, setCount] = useState<number>(love)
    const handleLike = () => {
        if (!isLogin) openModal()
        else {
            const type = like ? "minus" : "add"
            updateReplyLike(type, replyId)
            setCount((prev) => like ? prev - 1 : prev + 1)
        }
    }
    const { type, setType, setCommentId, setReplyTo } = useContext(CommentContext);
    const addReply = () => {
        if (type === "comment") setType("reply");
        setCommentId(commentId);
        setReplyTo({ username, replyId });
        const clientHeight = document.querySelector(".articleContainer").clientHeight;
        window.scrollTo({ top: clientHeight - 200 });
    }
    const delShow = userId === user_id;
    useEffect(() => {
        if (replyLike !== undefined) {
            setLike(replyLike.has(String(replyId)))
        }
    });
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
                            {delShow && <span styleName="delete">删除</span>}
                        </div>
                        <div>{content}</div>
                        <div styleName='bottomContainer'>
                            <div styleName='flex_container'>
                                <span onClick={handleLike}>{like ? likedIcon : likeIcon}</span>
                                <span>{count == 0 ? '点赞' : love}</span>
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
                            {delShow && <span styleName="delete">删除</span>}
                        </div>
                        <div styleName='contentContainer'>
                            {content}
                        </div>
                        <div styleName='replyedContainer'>
                            "{replyContent}"
                        </div>
                        <div styleName='bottomContainer'>
                            <div styleName='flex_container'>
                                <span onClick={handleLike}>{like ? likedIcon : likeIcon}</span>
                                <span>{count == 0 ? '点赞' : love}</span>
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