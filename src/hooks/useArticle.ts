import ArticleContext from "@/context/article"
import { useContext } from "react"

const useArticle = (id: number) => {
    const { getArticle } = useContext(ArticleContext);
    return getArticle(id)
}
export default useArticle;