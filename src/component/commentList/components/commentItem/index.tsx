import { Avatar, Divider, message } from "antd"
import React, { useContext, useEffect, useRef, useState, FC } from "react"
import { likeIcon, likedIcon, commentIcon } from "@/icon"
import { UserOutlined } from '@ant-design/icons';
import { replyItem, ArticleComment, baseComment } from "@/api/comment";
import ReplyItem from "../replyItem/replyItem";
import CommentContext from "@/context/commentContext";
import { fromNow } from "@/component/util";
import "./style.scss";
import useLove from "@/hooks/useLove";
const Index: FC<ArticleComment | baseComment> = (props) => {
    const { username, time, content, love, replyList, id } = props;
    const replyMap = new Map<number, replyItem>();
    if (replyList) {
        for (let ele of replyList) {
            replyMap.set(ele.id, ele);
        }
    }
    const { type, setType, setCommentId, setReplyTo, catagory } = useContext(CommentContext);
    const cata = catagory === "list" ? "list" : "article_comment";
    const [like, handleLike, count] = useLove(cata, id, love);
    const addReply = (replyId = 0) => {
        if (type === "comment") {
            setType("reply");
        }
        setCommentId(id);
        setReplyTo({ username, replyId });
        let clientHeight: number;
        if (catagory === "article") clientHeight = document.querySelector("#articleContainer").clientHeight;
        else clientHeight = document.querySelector("#formContainer").clientHeight;
        window.scrollTo({ top: clientHeight - 200, behavior: "smooth" });
    }
    return (
        <>
            <div styleName='commentContainer'>
                <div >
                    <Avatar icon={<UserOutlined />} size={30} />
                </div>
                <div styleName='mainContainer'>
                    <div styleName='title'>
                        <span>{username}</span>
                        <Divider type='vertical' />
                        <span>{fromNow(time)}</span>
                    </div>
                    <div styleName='contentContainer'>
                        {content}
                    </div>
                    <div styleName='bottomContainer'>
                        <div styleName='flex_container'>
                            <span onClick={handleLike}>{like ? likedIcon : likeIcon}</span>
                            <span>{count == 0 ? '点赞' : count}</span>
                        </div>
                        <div styleName='flex_container' onClick={() => { addReply() }}>
                            <span style={{ paddingTop: '2px', paddingLeft: '0.5rem' }}>{commentIcon}</span>
                            <span>{replyList?.length > 0 ? replyList?.length : "回复"}</span>
                        </div>
                    </div>
                    <div style={{ width: "100%" }}>
                        <div styleName='replyList'>
                            {replyList && replyList.map((element, index) => {
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
                                    replyId: element.id
                                }
                                return (
                                    <ReplyItem {...props} key={`${element.content}-${index}`} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Index


