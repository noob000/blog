import ArticleContext from "@/context/article";
import { RefObject, useContext, useEffect } from "react";

const useVisible = (ref: RefObject<HTMLDivElement>) => {
    const { updateList } = useContext(ArticleContext);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const item = entries[0];
            if (item.intersectionRatio > 0) {
                const isAll = updateList();
                if (isAll) observer.disconnect()
            }
        })
        ref.current && observer.observe(ref.current);
        return () => { observer.disconnect() }
    }, [ref.current])
}
export default useVisible