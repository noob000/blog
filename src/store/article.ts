
import { action, makeAutoObservable, observable } from "mobx";
import { ArticleItemProps } from "@/api/api";
class ArticleList {
    @observable articleList: Map<number, ArticleItemProps> = new Map();
    index: number = 0;
    constructor() {
        makeAutoObservable(this);
        this.refresh = this.refresh.bind(this);
        this.inital = this.inital.bind(this);
        this.getArticle = this.getArticle.bind(this);
        this.getAllArticle = this.getAllArticle.bind(this);
    }
    @action.bound
    refresh(data: ArticleItemProps[]) {
        for (let i of data) this.articleList.set(i.id, i)

        this.index++;
    }
    @action.bound
    inital(data: ArticleItemProps[]) {
        for (let i of data) this.articleList.set(i.id, i)
    }
    getArticle(id: number): ArticleItemProps {
        return this.articleList.get(id)
    }
    getAllArticle() {
        let result = [];
        for (let i of this.articleList.values()) result.push(i)
        return result

    }
}
const articleStore = new ArticleList();

export default articleStore
export { ArticleList }