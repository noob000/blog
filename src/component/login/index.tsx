import React, { useState, useEffect, FC } from "react";
import './style.scss';
import loginStore, { Login } from "@/store/login";
import { observer } from "mobx-react-lite";
import UserAnchor from "../userAnchor";
import LoginButton from "./components/loginButton";
const Index: FC<{ loginStore: Login }> = observer(({ loginStore }) => {
    const { loginState: { isLogin } } = loginStore
    console.log(isLogin)
    return (
        <>
            {isLogin ?
                <UserAnchor /> :
                <LoginButton loginStore={loginStore} />
            }
        </>
    )
})
export default () => <Index loginStore={loginStore} />
