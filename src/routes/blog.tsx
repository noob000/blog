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
interface loginStateType {
    username: string | null,
    user_id: number | null,
}
export default observer(({ articleStore }: { articleStore: ArticleList }) => {
    const [loginState, setLoginState] = useState<loginStateType | null>(null);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [clientWidth, setClientWidth] = useState<number>(1000);
    const [bottomBarVisible, setBottomVisible] = useState<boolean>(false);
    const [loginVisible, setLoginVisible] = useState<boolean>(false);
    const { articleList, inital } = articleStore;
    const { pathname } = useLocation();

    const prodArticleLink = () => {
        let articleLink = [];
        for (let { id } of articleList.values()) {
            articleLink.push(
                <Route path={`/article/${id}`} element={<Article id={id} articleStore={articleStore} key={id} />} />
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
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            request.post(
                'http://localhost:3666/lbt'
            ).then((res) => {
                if (res.data.info === 'success') {
                    const { username, user_id } = res.data;
                    setLoginState({
                        username, user_id
                    })
                }
            })
        }

    }, [])
    window.onresize = () => {
        setClientWidth(window.innerWidth);
    }
    const handleLoginState = (user: any) => {
        setLoginState(user)
    }

    return (
        <div>
            <div className='nav' id='navigation' >
                <span className='toggle_button'
                    onClick={() => setDrawerVisible(!drawerVisible)}><AlignLeftOutlined style={{ fontSize: '1.5rem' }} /></span>
                <span className='logo'>no_OBlog</span>
                <div className='flex-bar'></div>
                <ul>
                    <li ><Link
                        to='/'
                        className={pathname === "/" ? 'selectedLi' : ''}>home</Link></li>

                    <li 
                    className={pathname.includes("article") ? 'selectedLi' : ''}>article</li>
                    <li ><Link
                        to='/comment'
                        className={pathname.includes("comment") ? 'selectedLi' : ''}>comment</Link></li>
                </ul>
                <ThemeButton />
                <div className='login_container'>
                    {loginState === null
                        ? <Login
                            loginVisible={loginVisible}
                            setVisible={setLoginVisible}
                            setLoginState={handleLoginState}
                        />
                        : <UserAnchor logout={() => setLoginState(null)} />}
                </div>

            </div>

            <div className={classnames({
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
                    <Route path='/comment' element={<Comment loginState={loginState} />} />
                </Routes>
            </div>
            {/* <Bottombar /> */}
        </div>
    )
})
export type { loginStateType };
