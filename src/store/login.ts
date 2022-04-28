
import { action, makeAutoObservable, observable } from "mobx";
class Login {
    @observable loginState: {
        isLogin: boolean;
        userId: number | null;
    }
    constructor() {
        this.loginState = {
            isLogin: false,
            userId: null
        }
        makeAutoObservable(this);
        this.login = this.login.bind(this);
    }
    @action.bound
    login(id: number) {
        this.loginState = {
            isLogin: true,
            userId: id
        }
    }
    @action.bound
    logout() {
        this.loginState = {
            isLogin: false,
            userId: null
        }
    }
}
const loginStore = new Login();

export default loginStore
export { Login }