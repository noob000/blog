
import { action, makeAutoObservable, observable } from "mobx";
class Login {
    username: string | null = null;
    userId: number | null = null;
    @observable isLogin: boolean = false;
    @observable modalVisible: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.login = this.login.bind(this);
        this.openModal = this.openModal.bind(this);
        this.logout = this.logout.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    @action.bound
    login(id: number, username: string) {
        this.isLogin = true;
        this.userId = id;
        this.username = username;
    }
    @action.bound
    logout() {
        this.isLogin = false;
        this.userId = null;
    }
    @action.bound
    openModal() {
        this.modalVisible = true;
    }
    @action.bound
    closeModal() {
        this.modalVisible = false;
    }
}
const loginStore = new Login();

export default loginStore
export { Login }