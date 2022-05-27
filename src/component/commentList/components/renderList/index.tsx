import React, { useEffect, useState, useContext, FC } from "react";
import commentApi, { ArticleComment, baseComment } from "@/api/comment";
import CommentItem from '../commentItem/index'
import { Pagination } from "antd";

type CommentType = ArticleComment[] | baseComment[];
const RenderList: FC<{ data: CommentType }> = ({ data }) => {
    const [list, setList] = useState<CommentType[]>([]);
    const [currPage, setCurrPage] = useState<number>(1);
    useEffect(() => {
        let result: CommentType[] = [], temp: CommentType = [];
        data.forEach((element) => {
            if (temp.length < 5) temp.push(element);
            else if (temp.length === 5) {
                result.push(temp);
                temp = [element];
            }
        })
        console.log(result)
        result.push(temp);
        setList(result);
    }, [data])
    return (
        <>
            {list.length > 0 &&
                list[currPage - 1].map(element =>
                    <CommentItem
                        {...element}
                        key={element.id} />)
            }
            {list.length > 1 &&
                <Pagination total={data.length}
                    defaultCurrent={1}
                    current={currPage}
                    defaultPageSize={10}
                    onChange={(page) => { setCurrPage(page) }}
                    style={{ float: "right" }}
                />}
        </>
    )
}
export default RenderList