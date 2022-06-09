
import { action, makeAutoObservable, observable } from "mobx";
import api, { ArticleItemProps } from "@/api/api";
class ArticleList {
    @observable articleList: Map<number, ArticleItemProps> = new Map();
    index: number = 0;
    constructor() {
        makeAutoObservable(this);
        this.refresh = this.refresh.bind(this);
        this.inital = this.inital.bind(this);
        this.getArticle = this.getArticle.bind(this);
        this.getAllArticle = this.getAllArticle.bind(this);
        this.inital()
    }
    @action.bound
    refresh(data: ArticleItemProps[]) {
        for (let i of data) this.articleList.set(i.id, i)
        this.index++;
    }
    inital() {
        api.listInital()
            .then((data: any) => {
                for (let i of data) this.articleList.set(i.id, i)
                return api.getArticleList()
            })
            .then((data: ArticleItemProps[]) => {
                data.forEach((v) => {
                    const item = this.articleList.get(v.id);
                    this.articleList.set(v.id, { ...item, ...v });
                })
            })
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