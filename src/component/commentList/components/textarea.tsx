import { addArticleComment, addArticleReply } from "@/api/comment";
import loginStore, { Login } from "@/store/login";
import { Button, message as Message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react-lite";
import React, { FC, useContext, useState } from "react";
import CommentContext, { ReplyTo } from "../commentContext";

const Index: FC<{ loginStore: Login, id: number }> = observer(({ loginStore, id }) => {
    const { isLogin, userId, username, openModal } = loginStore;
    const [value, setValue] = useState<string>("");
    const { replyTo, commentId, type } = useContext(CommentContext)
    const handleClick = () => {
        if (!isLogin) openModal()
        else {
            if (value !== "") {
                if (type === "comment") {
                    addArticleComment(id, value, userId, username)
                        .then(({ message, statusCode }) => {
                            if (message === "success" && statusCode === 0) {
                                Message.success("成功提交！");
                                setValue("");
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
    const placeholder = replyTo === null ? "" : `回复:${(replyTo as ReplyTo).username}`
    return (
        <div>
            <div style={{ width: "25rem" }} id="input">
                <TextArea rows={6}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder} />
            </div>
            <Button onClick={handleClick}>{isLogin ? "发表评论" : "请先登录"}</Button>
        </div>
    )
})
export default ({ id }: { id: number }) => <Index loginStore={loginStore} id={id} /> 