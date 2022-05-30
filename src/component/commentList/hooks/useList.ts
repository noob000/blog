import commentApi, { ArticleComment, baseComment } from "@/api/comment";
import { useEffect, useState } from "react"

const useList = (refresh: number, type: "article" | "list", id?: number) => {
    const [commentList, setCommentList] = useState<ArticleComment[] | baseComment[]>([]);
    useEffect(() => {
        if (type === "article") {
            commentApi.getArticleComment(id).then((data) => {
                if (data !== "error")
                    setCommentList(data as any);
            })
        }
        else if (type === "list") {
            commentApi.getListComment().then((data) => {
                if (data !== "error") setCommentList(data)
            })
        }
    }, [refresh, type, id]);
    return commentList
}
export default useList;