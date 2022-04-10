import React, { useState, useEffect } from "react";
import './style.scss';
import { Form, Input, Button, Checkbox, Modal, message } from 'antd';
import request from "@/api/base";

interface loginProps {
    loginVisible: boolean;
    setVisible: any;
    setLoginState: Function
}
export default function Login(props: loginProps) {
    const [state, setState] = useState<string>('login');
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const handleLogin = (value: any) => {
        const { user, password } = value;
        setLoadingButton(true)
        request.post('/login', {
            email: user,
            password: password
        }).then((res) => {
            setLoadingButton(false);
            if (res.data.info === 'success') {
                const { user_id, token, username } = res.data;
                document.cookie = `token=${token};`
                const userinfo = {
                    user_id, username
                }
                props.setLoginState(userinfo)
                message.success('登录成功');
                props.setVisible(false);
            }
            else {
                message.warn('登录失败');
            }
        })
    }
    const handleRegister = (value: any) => {
        const { email, password, nickname } = value;

    }
    const modalValue = () => {
        if (state === 'login') {
            return (
                <div className='loginContainer'>
                    <div className='titleContainer'>
                        <h2>请填写以下信息进行登录</h2>
                        <Button type='primary' onClick={() => setState('register')}>注册</Button>
                    </div>

                    <div className='formContainer'>
                        <Form labelAlign={'left'}
                            layout={'vertical'}
                            onFinish={handleLogin}
                            onFinishFailed={() => message.error('请填入必要信息')}
                        >
                            <Form.Item
                                label="用户名"
                                name="user"
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
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div >
            )
        }
        else if (state === 'register') {
            return (
                <div className='loginContainer'>
                    <div className='titleContainer'>
                        <h2>请填写以下信息完成注册</h2>
                        <Button type='primary' onClick={() => setState('login')} >登录</Button>
                    </div>

                    <div className='formContainer'>
                        <Form layout='vertical' onFinish={handleRegister} onFinishFailed={() => message.error('请正确填入信息')}>
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
                                name="nickname"
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
            <Button type="primary" onClick={() => props.setVisible(true)}>
                登录
            </Button>
            <Modal
                visible={props.loginVisible}
                title={state === 'login' ? '登录' : "注册"}
                onCancel={() => props.setVisible(false)}
                maskClosable={true}
                closable={true}
                footer={null}
            >
                {modalValue()}
            </Modal>
        </div>
    )
}