import { Login } from "@/store/login";
import { createContext } from "react";

const LoginContext = createContext<{ loginStore: Login }>({
    loginStore: null
})
export default LoginContext