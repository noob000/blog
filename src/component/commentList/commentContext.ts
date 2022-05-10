import React from "react";
interface CommentContextProps {
    type: "reply" | "comment";
    setType: (type: "reply" | "comment") => void;
    replyTo:ReplyTo | null;
    setReplyTo: (obj: ReplyTo) => void
    commentId: number;
    setCommentId: (num: number) => void
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
    setCommentId: (num: number) => { }

})
export default CommentContext
export { ReplyTo }