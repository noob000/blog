import React, { useEffect, useState, useContext } from "react";
import './style.scss';
import CommentItem from './components/commentItem/commentItem';
import commentApi, { ArticleComment } from "@/api/comment";
import { observer } from "mobx-react-lite";
import NewComment from "./components/textarea/textarea";
import CommentContext, { ReplyTo } from "@/context/commentContext";
interface CommentListProps {
    id: number;
}
const CommentList = observer(({ id }: CommentListProps) => {
    const [commentList, setCommentList] = useState<ArticleComment[]>([]);
    const [type, setType] = useState<"reply" | "comment">("comment");
    const [commentId, setCommentId] = useState<number>(-1);
    const [replyTo, setReplyTo] = useState<ReplyTo | null>(null);
    const [refresh, setRefresh] = useState<number>(0)
    useEffect(() => {
        commentApi.getArticleComment(id)
            .then((res) => {
                setCommentList(res as any)
            })
    }, [refresh])
    return (
        <div styleName="commentOutContainer">
            <CommentContext.Provider value={{
                type,
                setType: (type: "reply" | "comment") => setType(type),
                replyTo,
                setReplyTo: (obj: ReplyTo) => setReplyTo(obj),
                commentId: commentId,
                setCommentId: (num: number) => setCommentId(num),
                setRefresh: () => setRefresh((prev) => prev + 1)
            }}>
                <NewComment id={id} />
                <div styleName='commentList'>
                    <h2 style={{marginTop:"1rem"}}>全部评论</h2>
                    {prodList(commentList)}
                </div>
            </CommentContext.Provider>
        </div>
    )
})
const prodList = (commentList: ArticleComment[]) => commentList.length > 0 ?
    commentList.map((element) => <CommentItem
        {...element}
        key={element.id}
    />
    )
    : []
export default CommentList;
