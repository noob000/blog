import React, { useEffect, useState, useContext } from "react";
import './style.scss';
import CommentItem from './components/commentItem';
// import { loginStateType } from '../page/blog';
import request from "@/api/base";
import { addArticleComment, addArticleReply, ArticleComment, getArticleComment } from "@/api/comment";
import TextArea from "antd/lib/input/TextArea";
import { Button, message as Message } from "antd";
import { observer } from "mobx-react-lite";
import loginStore, { Login } from "@/store/login";
import NewComment from "./components/textarea";
import CommentContext, { ReplyTo } from "./commentContext";
interface CommentListProps {
    id: number;
    loginStore: Login
}
const CommentList = observer(({ id, loginStore }: CommentListProps) => {
    const [commentList, setCommentList] = useState<ArticleComment[]>([]);
    const [type, setType] = useState<"reply" | "comment">("comment");
    const [commentId, setCommentId] = useState<number>(-1);
    const [replyTo, setReplyTo] = useState<ReplyTo | null>(null)
    useEffect(() => {
        getArticleComment(id)
            .then((res) => {
                setCommentList(res as any)
            })
    }, [])

    return (
        <>
            <CommentContext.Provider value={{
                type,
                setType: (type: "reply" | "comment") => setType(type),
                replyTo,
                setReplyTo: (obj: ReplyTo) => setReplyTo(obj),
                commentId: -1,
                setCommentId: (num: number) => setCommentId(num)
            }}>
                <NewComment id={id} />
                <div className='commentList'>
                    {prodList(commentList)}
                </div>
            </CommentContext.Provider>
        </>
    )
})
const prodList = (commentList: ArticleComment[]) => commentList.length > 0 ?
    commentList.map((element) => <CommentItem
        {...element}
        key={element.id}
    />
    )
    : []
export default ({ id }: { id: number }) => <CommentList loginStore={loginStore} id={id} />
