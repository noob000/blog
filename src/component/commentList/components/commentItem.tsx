import { Avatar, Divider, message } from "antd"
import moment from "moment"
import React, { useContext, useEffect, useRef, useState } from "react"
import { likeIcon, likedIcon, commentIcon } from "@/icon"
import { UserOutlined } from '@ant-design/icons';
import { replyItem, ArticleComment } from "@/api/comment";
import ReplyItem from "./replyItem";
import CommentContext from "../commentContext";

export default function CommentItem(props: ArticleComment) {
    const { username, time, content, love, replyList, id } = props;
    // const [like, setLike] = useState<boolean>(liked ? true : false);
    const [count, setCount] = useState<number>(love)
    const replyMap = new Map<number, replyItem>();
    if (replyList) {
        for (let ele of replyList) {
            replyMap.set(ele.id, ele);
        }
    }
    const { type, setType, setCommentId, setReplyTo } = useContext(CommentContext);
    const addReply = (replyId = 0) => {
        if (type === "comment") {
            setType("reply");
        }
        setCommentId(id);
        setReplyTo({ username, replyId });
        const clientHeight = document.querySelector(".articleContainer").clientHeight;
        window.scrollTo({ top: clientHeight - 200 });
    }
    return (
        <div>
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
                        <div className='flex_container'>
                            <span>{likeIcon}</span>
                            <span>{count == 0 ? '点赞' : count}</span>
                        </div>
                        <div className='flex_container' onClick={() => { addReply() }}>
                            <span style={{ paddingTop: '2px', paddingLeft: '0.5rem' }}>{commentIcon}</span>
                            <span>{replyList?.length > 0 ? replyList?.length : "回复"}</span>
                        </div>
                    </div>
                    <div style={{ width: "100%" }}>
                        <div className='replyList'>
                            {replyList && replyList.map((element) => {
                                let { replyTo } = element;
                                let replyContent: string, replyName: string;
                                if (replyTo !== 0) {
                                    const item = replyMap.get(replyTo);
                                    replyContent = item.content;
                                    replyName = item.username
                                }
                                else {
                                    replyContent = content;
                                    replyName = username;
                                }
                                const props = {
                                    ...element,
                                    replyContent,
                                    replyTo: replyName,
                                    replyId:replyTo
                                }
                                return (
                                    <ReplyItem {...props} key={element.content} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}


