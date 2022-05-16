
import { LoginRes } from "@/api/api";
import { action, makeAutoObservable, observable } from "mobx";
class Login {
    @observable userId: number | null = null;
    @observable isLogin: boolean = false;
    @observable modalVisible: boolean = false;
    username: string | null = null;
    articleLike: Set<string> | null;
    commentLike: Set<string> | null;
    replyLike: Set<string> | null;

    constructor() {
        makeAutoObservable(this);
        this.login = this.login.bind(this);
        this.openModal = this.openModal.bind(this);
        this.logout = this.logout.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    @action.bound
    login({ id, username, article_like, comment_like, reply_like }: LoginRes) {
        this.isLogin = true;
        this.userId = id;
        this.username = username;
        this.articleLike = new Set(article_like);
        this.commentLike = new Set(comment_like);
        this.replyLike = new Set(reply_like);
    }
    @action.bound
    logout() {
        this.isLogin = false;
        this.userId = null;
        this.articleLike = null;
        this.commentLike = null;
        this.replyLike = null;
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