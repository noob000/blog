import loginStore, { Login } from "@/store/login";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
interface UserIdProps {
    Fn: FC<{ currentUserId: number }>;
    loginStore: Login;
    props: any;
}
const Index: FC<UserIdProps> = observer(({ Fn, loginStore, props }) => {
    const { userId } = loginStore;
    return (
        <Fn currentUserId={userId} {...props} />
    )
})
const UserContext = (props: any) => {
    return <Index loginStore={loginStore} {...props} />
}
export default UserContext;