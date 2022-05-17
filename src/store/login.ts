
import api, { LoginRes } from "@/api/api";
import commentApi from "@/api/comment";
import { action, makeAutoObservable, observable, ObservableSet } from "mobx";
class Login {
    @observable userId: number | null = null;
    @observable isLogin: boolean = false;
    @observable modalVisible: boolean = false;
    username: string | null = null;
    @observable articleLike: ObservableSet<string>;
    @observable commentLike: ObservableSet<string>;
    @observable replyLike: ObservableSet<string>;
    @observable forceUpdate: number = 0;

    constructor() {
        makeAutoObservable(this);
        this.login = this.login.bind(this);
        this.openModal = this.openModal.bind(this);
        this.logout = this.logout.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateReplyLike = this.updateReplyLike.bind(this);
        this.updateArticleLike = this.updateArticleLike.bind(this);
        this.updateCommentLike = this.updateCommentLike.bind(this);
        this.updatSet = this.updatSet.bind(this);
    }
    @action.bound
    login({ id, username, article_like, comment_like, reply_like }: LoginRes) {
        this.isLogin = true;
        this.userId = id;
        this.username = username;
        this.articleLike = observable.set(new Set(article_like));
        this.commentLike = observable.set(new Set(comment_like));
        this.replyLike = observable.set(new Set(reply_like));
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
    @action.bound
    updateReplyLike(type: "add" | "minus", id: number) {
        commentApi.updateLove("reply", this.userId, id, type).then(({ message }) => {
            if (message === "success") {
                if (type === "add") this.replyLike.add(String(id));
                else this.replyLike.delete(String(id))
                this.updatSet()
            }
        })
    }
    @action.bound
    updateArticleLike(type: "add" | "minus", id: number) {
        commentApi.updateLove("article", this.userId, id, type).then(({ message }) => {
            if (message === "success") {
                if (type === "add") this.articleLike.add(String(id));
                else this.articleLike.delete(String(id))
                this.updatSet()
            }
        })

    }
    @action.bound
    updateCommentLike(type: "add" | "minus", id: number) {
        commentApi.updateLove("comment", this.userId, id, type).then(({ message }) => {
            if (message === "success") {
                if (type === "add") this.commentLike.add(String(id));
                else this.commentLike.delete(String(id))
                this.updatSet()
            }
        })
    }
    @action.bound
    updatSet() {
        this.forceUpdate++
    }

}
const loginStore = new Login();

export default loginStore
export { Login }