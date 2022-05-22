import ArticleContext from "@/context/article"
import { useContext } from "react"


const useArticle = (id?: number) => {
    const { getArticle, getAllArticle } = useContext(ArticleContext);
    if (id) return getArticle(id)
    if (id === undefined) return getAllArticle()

}
export default useArticle;