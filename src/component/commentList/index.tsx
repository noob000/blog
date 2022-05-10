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
interface CommentListProps {
    id: number;
    loginStore: Login
}
const CommentList = observer(({ id, loginStore }: CommentListProps) => {
    const { isLogin, userId, username } = loginStore;
    const [commentList, setCommentList] = useState<ArticleComment[]>([]);
    const [type, setType] = useState<"reply" | "comment">("comment");
    const [value, setValue] = useState<string>("");
    const [replyObj, setReplyObj] = useState<{ commentId: number, replyTo: number }>({ commentId: -1, replyTo: -1 })
    useEffect(() => {
        getArticleComment(id)
            .then((res) => {
                setCommentList(res as any)
            })
    }, [])
    const prodList = () => commentList.length > 0 ?
        commentList.map((element) => <CommentItem
            {...element}
            key={element.id}
        />
        )
        : []
    const content = () => {
        if (!isLogin) return "请先登录";
        else if (type === 'comment') return "发表评论";
        else if (type === "reply") return "发表回复";
    }
    const handleClick = () => {
        if (!isLogin) {

        }
        else {
            if (value !== "") {
                if (type === "comment") {
                    addArticleComment(id, value, userId, username)
                        .then(({ data: { message, statusCode } }) => {
                            if (message === "success" && statusCode === 200) {
                                Message.success("成功提交！");
                                setValue("");
                            }
                            else Message.error(message);
                        })
                }
                else if (type === "reply") {
                    const { replyTo, commentId } = replyObj;
                    addArticleReply(id, userId, username, value, replyTo, commentId)
                        .then(({ data: { message, statusCode } }) => {
                            if (message === "success" && statusCode === 200) {
                                Message.success("成功提交！");
                                setValue("");
                            }
                            else Message.error(message);
                        })
                }
            }
            else {
                Message.warn("请不要提交空评论或回复");
            }
        }
    }
    return (
        <>
            <div>
                <TextArea cols={7} value={value} onChange={(e) => { setValue(e.target.value) }} />
                <Button onClick={handleClick}>{content()}</Button>
            </div>
            <div className='commentList'>
                {prodList()}
            </div>
        </>
    )
})
export default ({ id }: { id: number }) => <CommentList loginStore={loginStore} id={id} />
