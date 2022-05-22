import { ArticleItemProps } from "@/api/api";
import React, { createContext } from "react"
interface ArticleContextProps {
    getArticle:(id: number) => ArticleItemProps|null
}

const ArticleContext = createContext<ArticleContextProps>({
    getArticle:null
})
export default ArticleContext