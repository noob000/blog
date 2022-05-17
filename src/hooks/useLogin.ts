import LoginContext from "@/context/loginContext"
import { useContext } from "react"

const useLogin = () => {
    const { loginStore } = useContext(LoginContext);
    return loginStore
}
export default useLogin