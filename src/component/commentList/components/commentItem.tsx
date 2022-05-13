import { Avatar, Divider, message } from "antd"
import React, { useContext, useEffect, useRef, useState, FC } from "react"
import { likeIcon, likedIcon, commentIcon } from "@/icon"
import { UserOutlined } from '@ant-design/icons';
import { replyItem, ArticleComment } from "@/api/comment";
import ReplyItem from "./replyItem";
import CommentContext from "../commentContext";
import { fromNow } from "@/component/util";
import loginStore, { Login } from "@/store/login";
import { observer, useLocalStore } from "mobx-react-lite";
import UserContext from "@/component/userContext/userIdHoc";
import "../style.scss";
const Index: FC<ArticleComment & { currentUserId: number | null }> = observer((props) => {
    const { username, time, content, love, replyList, id, user_id, currentUserId } = props;
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
    console.log(user_id, currentUserId)
    return (
        <>
            <div styleName='commentContainer'>
                <div styleName='avatarContainer'>
                    <Avatar icon={<UserOutlined />} size={30} />
                </div>
                <div styleName='mainContainer'>
                    <div styleName='title'>
                        <span>{username}</span>
                        <Divider type='vertical' />
                        <span>{fromNow(time)}</span>
                        {user_id === currentUserId && <span styleName="delete">删除</span>}
                    </div>
                    <div styleName='contentContainer'>
                        {content}
                    </div>
                    <div styleName='bottomContainer'>
                        <div styleName='flex_container'>
                            <span>{likeIcon}</span>
                            <span>{count == 0 ? '点赞' : count}</span>
                        </div>
                        <div styleName='flex_container' onClick={() => { addReply() }}>
                            <span style={{ paddingTop: '2px', paddingLeft: '0.5rem' }}>{commentIcon}</span>
                            <span>{replyList?.length > 0 ? replyList?.length : "回复"}</span>
                        </div>
                    </div>
                    <div style={{ width: "100%" }}>
                        <div styleName='replyList'>
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
                                    replyId: element.id
                                }
                                return (
                                    <ReplyItem {...props} key={element.content} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
})
export default (props: ArticleComment) => {
    return (
        <UserContext Fn={Index} props={props} />
    )
}


