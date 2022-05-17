
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React,{ useState, useRef, useEffect } from "react";

import './style.scss';
import classname from "classnames";
export default function UserAnchor(props: any) {
    const [listVisible, setListVisible] = useState<boolean>(false);
    const myRef: any = useRef(null);
    useEffect(() => {
        window.addEventListener('onclick', (event) => {
            if (!myRef.current.contains(event.target) && listVisible)
                setListVisible(false)
        })
        return window.removeEventListener('onclick', (event) => {
            if (!myRef.current.contains(event.target) && listVisible)
                setListVisible(false)
        })
    })

    return (
        <div ref={myRef}>
            <div onClick={() => { setListVisible(true) }}>
                <Avatar icon={<UserOutlined />} styleName='userAnchor' />
            </div>
            <div styleName={classname({
                logoutList: true,
                logoutList_show: !listVisible
            })}>
                <p>个人主页</p>
                <p onClick={props.logout}>退出登录</p>
            </div>
        </div>
    )
}
