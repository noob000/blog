import { ArticleItemProps } from "@/api/api";
import articleStore from "@/store/article";
import React, { createContext } from "react"
interface ArticleContextProps {
    getArticle: ((id: number) => ArticleItemProps) | null,
    getAllArticle: (() => ArticleItemProps[]) | null,
    updateList: (() => boolean) | null
}

const ArticleContext = createContext<ArticleContextProps>({
    getArticle: articleStore.getArticle,
    getAllArticle: articleStore.getAllArticle,
    updateList: articleStore.updateList
})
export default ArticleContext