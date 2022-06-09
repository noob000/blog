import { ArticleItemProps } from "@/api/api";
import React, { createContext } from "react"
interface ArticleContextProps {
    getArticle: ((id: number) => ArticleItemProps) | null,
    getAllArticle: (() => ArticleItemProps[]) | null,
    updateList: (() => boolean) | null
}

const ArticleContext = createContext<ArticleContextProps>({
    getArticle: null,
    getAllArticle: null,
    updateList: null
})
export default ArticleContext