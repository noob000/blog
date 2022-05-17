import React, { useState, useEffect, FC } from "react";
// import './style.scss';
import loginStore, { Login } from "@/store/login";
import { observer } from "mobx-react-lite";
import UserAnchor from "../userAnchor";
import LoginButton from "./components/loginButton";
const Index: FC<{ loginStore: Login }> = observer(({ loginStore }) => {
    const { isLogin } = loginStore
    return (
        <>
            {isLogin ?
                <UserAnchor /> :
                <div/>
            }
        </>
    )
})
export default () => <Index loginStore={loginStore} />
