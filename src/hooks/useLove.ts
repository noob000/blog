import commentApi from "@/api/comment";
import { stringifyKey } from "mobx/dist/internal";
import { useEffect, useState } from "react";
import useThrottle from "./useThrottle";

const useLove = (
    catagory: "article" | "comment" | "reply",
    id: number,
    loveCount = 0): [boolean, () => void,number] => {
    const [love, setLove] = useState<boolean>(false);
    const [cata, setCata] = useState<string>(catagory);
    const [count, setCount] = useState<number>(loveCount)
    useEffect(() => {
        const str: string | null = localStorage.getItem(catagory);
        if (str !== null) {
            const likeArr = str.split(",");
            if (likeArr.includes(String(id)))
                setLove(true)
        }

    }, [])
    const handleLove = () => {
        const type = love ? "minus" : "add"
        const str: string | null = localStorage.getItem(catagory);
        commentApi.updateLove(catagory, id, type)
        if (type === "add") {
            if (str !== null) {
                let likeArr = str.split(",");
                likeArr = [...likeArr, String(id)];
                localStorage.setItem(catagory, likeArr.join(","));
            }
            else localStorage.setItem(catagory, String(id));
            setLove(true);
            setCount((prev) => prev + 1)
        }
        else if (type === "minus") {
            let likeArr = str.split(",");
            likeArr = likeArr.filter((v) => v !== String(id));
            localStorage.setItem(catagory, likeArr.join(","));
            setLove(false);
            setCount((prev) => prev - 1)
        }
    }
    return [love, useThrottle(handleLove),count];
}
export default useLove;