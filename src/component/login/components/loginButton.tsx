import React, { useState, useEffect, FC } from "react";
import '../style.scss';
import { Form, Input, Button, Checkbox, Modal, message as Message } from 'antd';
import request from "@/api/base";
import api from "@/api/api";
import { observer } from "mobx-react-lite";
import { Login } from "@/store/login";

const LoginButton: FC<{ loginStore: Login }> = observer(({ loginStore }) => {
    const { login, modalVisible, openModal, closeModal } = loginStore
    const [buttonState, setButtonState] = useState<"register" | "login">('login');
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const handleLogin = ({ email, password }: { email: string, password: string }) => {
        api.login({ email, password })
            .then(({ statusCode, data }) => {
                const { message, id } = data;
                if (statusCode === 0 && message === "success") {
                    Message.success("登录成功");
                    login(id);
                    closeModal()
                }
                else if (statusCode === 0) Message.error(`${message}`);
                else Message.error("服务器错误");
            })

    }
    const handleRegister = (value: any) => {
        const { email, password, username } = value;
        const reg = /^[a-zA-Z]\w{5,17}$/;
        if (!reg.test(password)) {
            Message.error("密码应为6-18为英文字母,数字与下划线的组合");
            return;
        }
        if (/(com|weixin)/.test(username)) {
            Message.error("昵称包含非法字符");
            return;
        }
        api.register({ email, password, username }).then((res) => {

        })
    }

    const modalValue = () => {
        if (buttonState === 'login') {
            return (
                <div className='loginContainer'>
                    <div className='titleContainer'>
                        <h2>请填写以下信息进行登录</h2>
                        <Button type='primary' onClick={() => setButtonState('register')}>注册</Button>
                    </div>

                    <div className='formContainer'>
                        <Form labelAlign={'left'}
                            layout={'vertical'}
                            onFinish={handleLogin}
                            onFinishFailed={() => Message.error('请填入必要信息')}
                        >
                            <Form.Item
                                label="邮箱"
                                name="email"
                                rules={[{ required: true, message: '请输入您的帐号或昵称' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{ required: true, message: '请输入您的密码' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                                <Button type="primary" loading={loadingButton} htmlType="submit" >
                                   登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div >
            )
        }
        else if (buttonState === 'register') {
            return (
                <div className='loginContainer'>
                    <div className='titleContainer'>
                        <h2>请填写以下信息完成注册</h2>
                        <Button type='primary' onClick={() => setButtonState('login')} >登录</Button>
                    </div>

                    <div className='formContainer'>
                        <Form layout='vertical' onFinish={handleRegister} onFinishFailed={() => Message.error('请正确填入信息')}>
                            <Form.Item
                                label="邮箱"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的邮箱'
                                    },
                                    {
                                        type: 'email',
                                        message: "请输入正确的邮箱格式"
                                    }]}

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{ required: true, message: '请输入您的密码' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="确认密码"
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[{ required: true, message: '请输入您的密码' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次输入的密码不一致'));
                                    },
                                }),]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="昵称"
                                name="username"
                                rules={[{ required: true, message: '请输入您的昵称' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                                <Button type="primary" htmlType="submit" >
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            )
        }
    }
    return (
        <div>
            <Button type="primary" onClick={openModal}>
                登录
            </Button>
            <Modal
                visible={modalVisible}
                title={buttonState === 'login' ? '登录' : "注册"}
                onCancel={closeModal}
                maskClosable={true}
                closable={true}
                footer={null}
            >
                {modalValue()}
            </Modal>
        </div>
    )
})
export default LoginButton