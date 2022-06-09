
import { action, makeAutoObservable, observable } from "mobx";
import api, { ArticleItemProps } from "@/api/api";
class ArticleList {
    @observable articleList: Map<number, ArticleItemProps> = new Map();
    @observable isAll: boolean = false;
    lastId: number = 0;
    constructor() {
        makeAutoObservable(this);
        this.inital = this.inital.bind(this);
        this.getArticle = this.getArticle.bind(this);
        this.getAllArticle = this.getAllArticle.bind(this);
        this.updateList = this.updateList.bind(this);
        this.inital()
    }
    inital() {
        api.listInital()
            .then((data: any) => {
                for (let i of data) this.articleList.set(i.id, i)
                this.lastId = data[data.length - 1].id
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
    @action.bound
    updateList() {
        if (!this.isAll)
            api.updateList(this.lastId).then(({ list, isAll }: any) => {
                for (let i of list) this.articleList.set(i.id, i)
                this.lastId = list[list.length - 1].id
                this.isAll = isAll
            })
        return this.isAll
    }
}
const articleStore = new ArticleList();

export default articleStore
export { ArticleList }