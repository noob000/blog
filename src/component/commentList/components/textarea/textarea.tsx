import commentApi from "@/api/comment";
import { Button, Form, Input, message as Message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { FC, useContext, useState } from "react";
import CommentContext, { ReplyTo } from "@/context/commentContext";
import "./style.scss";
const Index: FC<{ id: number }> = ({ id }) => {

    const [value, setValue] = useState<string>("");
    const { replyTo, commentId, type, setType, setReplyTo, setCommentId, setRefresh } = useContext(CommentContext);
    const handleSubmit = (values: { username: string, email: string, content: string }) => {
        const { username, email, content } = values;
        if (/(com|weixin)/.test(username)) {
            Message.error("昵称包含非法字符");
            return;
        }
        if (content !== "") {
            if (type === "comment") {
                commentApi.addArticleComment(id, content, username, email)
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
                commentApi.addArticleReply(id, email, username, content,(replyTo as ReplyTo).replyId, commentId)
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
    const cancelReply = () => {
        setType("comment");
        setReplyTo(null);
        setCommentId(null)
    }
    const placeholder = replyTo === null ? "请输入您的评论" : `回复:${(replyTo as ReplyTo).username}`
    return (
        <div styleName="formContainer">
            <Form styleName="darkMode" onFinish={handleSubmit}>
                <Form.Item name="content" label="内容" required wrapperCol={{ span: 15 }} >
                    <TextArea
                        rows={3}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={placeholder}
                        id="inputArea"
                    /></Form.Item>
                <Form.Item name="username"
                    label="昵称"
                    rules={[{ required: true, message: '请输入您的帐号或昵称' }]}
                    wrapperCol={{ span: 7 }}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        { required: true, message: '请输入您的帐号或昵称' },
                        {
                            type: 'email',
                            message: '不是一个有效的邮箱地址',
                        }]}
                    wrapperCol={{ span: 7 }}>
                    <Input />
                </Form.Item>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button htmlType="submit">发表评论</Button>
                    {type === "reply" && <Button onClick={cancelReply}>取消回复</Button>}
                </div>
            </Form>

        </div>

    )
}
export default Index
