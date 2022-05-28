import React from "react";
import { Route, Link, Routes, BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import Home from './home';
// import Blog_part from './blog_part';
import './style/blog.scss';
import '@/style/basic.scss';
import { Tooltip } from 'antd';
import { ToTopOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Article from '../component/article';
// import Bottombar from '../component/bottombar';
import ThemeButton from '../component/themeButton';
import { useState, useEffect, useRef } from "react";
import articleStore, { ArticleList } from "@/store/article";
import { observer } from "mobx-react-lite";
import api from "@/api/api";
import 'antd/dist/antd.css';
import Comment from "./comment"
import ArticleContext from "@/context/article";
interface loginStateType {
    username: string | null,
    user_id: number | null,
}
export default observer(({ articleStore }: { articleStore: ArticleList }) => {
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [clientWidth, setClientWidth] = useState<number>(1000);
    const [bottomBarVisible, setBottomVisible] = useState<boolean>(false);
    const { articleList, inital } = articleStore;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const prodArticleLink = () => {
        let articleLink = [];
        for (let { id } of articleList.values()) {
            articleLink.push(
                <Route path={`/article/${id}`} element={<Article id={id} />} />
            )
        }
        return articleLink;
    }
    useEffect(() => {
        api.getArticleList().then((res: any) => {
            inital(res)
        })
    }, [])
    useEffect(() => {
        setDrawerVisible(clientWidth > 1200 ? false : drawerVisible)
    }, [clientWidth])

    window.onresize = () => {
        setClientWidth(window.innerWidth);
    }

    return (
        <div styleName="root">
            <div styleName='nav' id='navigation' >
                <span onClick={() => navigate("/")} styleName="backButton"> <ArrowLeftOutlined /></span>
                <span styleName='logo' onClick={() => navigate("/")}>no_OBlog</span>
                <ul style={{ marginTop: 0 }}>
                    <li ><Link
                        to='/'
                        styleName={pathname === "/" ? 'selectedLi' : ''}>home</Link></li>

                    <li
                        styleName={pathname.includes("article") ? 'selectedLi' : ''}>article</li>
                    <li ><Link
                        to='/comment'
                        styleName={pathname.includes("comment") ? 'selectedLi' : ''}>comment</Link></li>
                </ul>
                <ThemeButton />
            </div>

            <div styleName={classnames({
                toTop: true,
                toTopDisplay: bottomBarVisible
            })}
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }}>
                <Tooltip title='move to top'>
                    <ToTopOutlined />
                </Tooltip>

            </div>
            <div>
                <ArticleContext.Provider value={{
                    getArticle: articleStore.getArticle,
                    getAllArticle: articleStore.getAllArticle
                }}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        {articleList.size > 0 && prodArticleLink()}
                        <Route path='/comment' element={<Comment />} />
                    </Routes>
                </ArticleContext.Provider>
            </div>
            {/* <Bottombar /> */}

        </div >
    )
})
export type { loginStateType };
