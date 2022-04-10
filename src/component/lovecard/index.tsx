import { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import yyx from './img/g.jpg';
import zhl from './img/b.jpg';
import { dancingHeart } from '@/icon';
import './style.scss';
import { day } from '../util';
import React from 'react';
export default function Lovecard() {
    const [year, setYear] = useState(new Date().getFullYear() - 2020);
    const [minute, setMinutes] = useState(new Date().getMinutes());
    const [seconds, setSeconds] = useState(new Date().getSeconds());
    const [hour, setHour] = useState(new Date().getHours());
    const timer = setInterval(() => {
        setYear(new Date().getFullYear() - 2020);
        setMinutes(new Date().getMinutes());
        setSeconds(new Date().getSeconds());
        setHour(new Date().getHours());
    }, 1000)
    useEffect(() => {
        return clearInterval(timer);
    }
    )
    const content = year + '年' + day() + '天' + hour + '小时' + minute + '分钟' + seconds + '秒';
    return (
        <div className='card_love'>
            <div className='avatar_container'>
                <Avatar src={zhl} size='large' className='zhl' />
                <span className='heart'>{dancingHeart}</span>
                <Avatar src={yyx} size='large' className='yyx' />
            </div>
            <p>{content}</p>
        </div>
    )

}