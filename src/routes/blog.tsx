import React from "react";
import { Route, Link, Routes, BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import Home from './home';
// import Blog_part from './blog_part';
import './style/blog.scss';
import '@/style/basic.scss';
import { Tooltip, Drawer } from 'antd';
import UserAnchor from "@/component/userAnchor";
import { ToTopOutlined, AlignLeftOutlined } from '@ant-design/icons';
import Article from '../component/article';
// import Bottombar from '../component/bottombar';
import Comment from './comment';
import ThemeButton from '../component/themeButton';
import { useState, useEffect, useRef } from "react";
import Login from "../component/login";
import Cookies from 'js-cookie';
import articleStore, { ArticleList } from "@/store/article";
import request from "@/api/base";
import { observer } from "mobx-react-lite";
import api from "@/api/api";
import LoginButton from "../component/login"
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

    const prodArticleLink = () => {
        let articleLink = [];
        for (let { id } of articleList.values()) {
            articleLink.push(
                <Route path={`/article/${id}`} element={<Article id={id} />} />
            )
        }
        return articleLink;
    }
    // useEffect(() => {
    //     request.get('http://localhost:3000/get_articleAmount')
    //         .then((res) => setArticleAmount(res.data))

    // }, [])//获取数据
    // useEffect(() => {
    //     const bottomObserver = new IntersectionObserver((entries) => {
    //         if (entries[0].intersectionRatio <= 0) {
    //             setBottomVisible(false)
    //         }
    //         else if (entries[0].intersectionRatio > 0) {
    //             setBottomVisible(true)
    //         }
    //     })
    //     bottomObserver.observe(document.querySelector('.site_info') as Element);
    // }, [])//判断底部信息栏是否出现在视野
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
                <span styleName='toggle_button'
                    onClick={() => setDrawerVisible(!drawerVisible)}><AlignLeftOutlined style={{ fontSize: '1.5rem' }} /></span>
                <span styleName='logo'>no_OBlog</span>
                <div styleName='flex-bar'></div>
                <ul>
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
                <div styleName='login_container'>
                    <LoginButton />
                </div>

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
                <Routes>
                    <Route path='/' element={<Home />} />

                    <>
                        {articleList.size > 0 && prodArticleLink()}
                    </>
                    {/* <Route path='/comment' element={<Comment loginState={loginState} />} /> */}
                </Routes>
            </div>
            {/* <Bottombar /> */}
        </div>
    )
})
export type { loginStateType };
