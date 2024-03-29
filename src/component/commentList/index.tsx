import React, { useEffect, useState, useContext, FC } from "react";
import './style.scss';
import CommentItem from './components/commentItem/index'
import commentApi, { ArticleComment, baseComment } from "@/api/comment";
import NewComment from "./components/textArea/index"
import CommentContext, { ReplyTo } from "@/context/commentContext";
import useList from "./hooks/useList";
import RenderList from "./components/renderList";
interface CommentListProps {
    id?: number;
    catagory: "article" | "list"
}
const CommentList = ({ id, catagory = "article" }: CommentListProps) => {
    const [type, setType] = useState<"reply" | "comment">("comment");
    const [commentId, setCommentId] = useState<number>(-1);
    const [replyTo, setReplyTo] = useState<ReplyTo | null>(null);
    const [refresh, setRefresh] = useState<number>(0)
    const commentList = useList(refresh, catagory, id);
    return (
        <div styleName="commentOutContainer">
            <CommentContext.Provider value={{
                type,
                setType: (type: "reply" | "comment") => setType(type),
                replyTo,
                setReplyTo: (obj: ReplyTo) => setReplyTo(obj),
                commentId: commentId,
                setCommentId: (num: number) => setCommentId(num),
                setRefresh: () => setRefresh((prev) => prev + 1),
                catagory
            }}>
                <NewComment id={id} />
                <div styleName='commentList'>
                    <h2 style={{ marginTop: "1rem" }}>全部评论</h2>
                    {commentList.length > 0 && <RenderList data={commentList} />}
                </div>
            </CommentContext.Provider>
        </div>
    )
}



export default CommentList;
