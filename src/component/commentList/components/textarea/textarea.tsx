import { addArticleComment, addArticleReply } from "@/api/comment";
import loginStore, { Login } from "@/store/login";
import { Button, message as Message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react-lite";
import React, { FC, useContext, useState } from "react";
import CommentContext, { ReplyTo } from "../../commentContext";
import "./style.scss";
const Index: FC<{ loginStore: Login, id: number }> = observer(({ loginStore, id }) => {
    const { isLogin, userId, username, openModal } = loginStore;
    const [value, setValue] = useState<string>("");
    const { replyTo, commentId, type, setType, setReplyTo, setCommentId, setRefresh } = useContext(CommentContext);
    const handleClick = () => {
        if (!isLogin) openModal()
        else {
            if (value !== "") {
                if (type === "comment") {
                    addArticleComment(id, value, userId)
                        .then(({ message, statusCode }) => {
                            if (message === "success" && statusCode === 0) {
                                Message.success("成功提交！");
                                setValue("");
                                setRefresh();
                            }
                            else Message.error(message);
                        })
                }
                else if (type === "reply") {
                    addArticleReply(id, userId, username, value, (replyTo as ReplyTo).replyId, commentId)
                        .then(({ message, statusCode }) => {
                            if (message === "success" && statusCode === 0) {
                                Message.success("成功提交！");
                                setValue("");
                                setRefresh();

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
    const cancelReply = () => {
        setType("comment");
        setReplyTo(null);
        setCommentId(null)
    }
    const placeholder = replyTo === null ? "" : `回复:${(replyTo as ReplyTo).username}`
    return (
        <div styleName="textAreaContainer">
            <TextArea
                rows={3}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                id="inputArea"
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Button onClick={handleClick} styleName="confirmButton">{isLogin ? "发表评论" : "请先登录"}</Button>
                {type === "reply" && <Button onClick={cancelReply}>取消回复</Button>}
            </div>
        </div>

    )
})
export default ({ id }: { id: number }) => <Index loginStore={loginStore} id={id} /> 