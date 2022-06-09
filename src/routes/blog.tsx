import React, { lazy, Suspense } from "react";
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
import 'antd/dist/antd.css';
import { commentLinkIcon } from "@/icon";
import ArticleContext from "@/context/article";
interface loginStateType {
    username: string | null,
    user_id: number | null,
}
const Comment = lazy(() => import("./comment"))
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
        setDrawerVisible(clientWidth > 1200 ? false : drawerVisible)
    }, [clientWidth])

    window.onresize = () => {
        setClientWidth(window.innerWidth);
    }
    return (
        <div styleName="root">
            <div styleName='nav' id='navigation' >
                {pathname !== "/" && <span onClick={() => navigate("/")} styleName="backButton"> <ArrowLeftOutlined /></span>}
                <span styleName='logo' onClick={() => navigate("/")}>no_OBlog</span>
                <ul style={{ marginTop: 0 }}>
                    <li ><Link
                        to='/'
                        styleName={pathname === "/" ? 'selectedLi' : ''}>首页</Link></li>

                    <li
                        styleName={pathname.includes("article") ? 'selectedLi' : ''}>文章</li>
                    <li ><Link
                        to='/comment'
                        styleName={pathname.includes("comment") ? 'selectedLi' : ''}>留言</Link></li>
                </ul>
                <div styleName="buttonContainer">
                    {pathname !== "/comment" && <div styleName="commentLinkIcon" onClick={() => { navigate("/comment") }}>{commentLinkIcon}</div>}
                    <ThemeButton />
                </div>
            </div>
            <div>
                <ArticleContext.Provider value={{
                    getArticle: articleStore.getArticle,
                    getAllArticle: articleStore.getAllArticle,
                    updateList:articleStore.updateList
                }}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        {prodArticleLink()}
                        <Route path='/comment' element={
                            <Suspense fallback={null}>
                                <Comment />
                            </Suspense>} />
                    </Routes>
                </ArticleContext.Provider>
            </div>
            {/* <Bottombar /> */}

        </div >
    )
})
export type { loginStateType };
