import React, { FC } from "react";
import './style.scss'
const Index: FC<any> = () => {
    return (
        <div styleName="intro_card">
            <h3>本站简介:</h3>
            <p>前端用到的技术栈:</p>
            <p>TypeScript+React+React-router+Webpack+Mobx+Antd(未来可能会剔除更换为自己的组件库)</p>
            <p>后端用到的技术栈:</p>
            <p>TypeScript+Nest.js+Mysql</p>
            <p>页面布局及部分样式参考:<a href="https://www.yevpt.com/">YEVPT</a></p>
        </div>
    )
}
export default Index