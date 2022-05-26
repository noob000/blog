import React from "react";
interface CommentContextProps {
    type: "reply" | "comment";
    setType: (type: "reply" | "comment") => void;
    replyTo: ReplyTo | null;
    setReplyTo: (obj: ReplyTo) => void
    commentId: number;
    setCommentId: (num: number) => void;
    setRefresh: () => void;
    catagory: "article" | "list";
}
interface ReplyTo {
    username: string;
    replyId: number
}
const CommentContext = React.createContext<CommentContextProps>({
    type: "comment",
    setType: (type: "reply" | "comment") => { },
    replyTo: null,
    commentId: -1,
    setReplyTo: (obj: ReplyTo) => { },
    setCommentId: (num: number) => { },
    setRefresh: () => { },
    catagory: "article"
})
export default CommentContext
export { ReplyTo }