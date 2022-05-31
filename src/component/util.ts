
import { useRef } from "react";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
function useDebounce(time: number, callback: Function) {
    let timer = useRef<any>(null);
    return function (...args: any) {
        if (timer.current !== null) {
            clearTimeout(timer.current);
            timer.current = null
        }
        timer.current = setTimeout(() => {
            callback(...args);
            clearTimeout(timer.current);
            timer.current = null
        }, time)
    }
}
function useThrottle(time: number, callback: Function) {
    let timer = useRef<any>(null);
    return function (...args: any) {
        if (timer.current == null) {
            callback(...args);
            timer.current = setTimeout(() => {
                clearTimeout(timer.current);
                timer.current = null
            }, time)
        }
    }
}
function day() {
    let newDate = Number(new Date());
    let oldDate = Number(new Date(new Date().getFullYear().toString()))
    return Math.ceil((newDate - oldDate) / (24 * 60 * 60 * 1000)) + 32;
}

const fromNow = (time: string) => dayjs(time).fromNow();
export { useThrottle, useDebounce, day,fromNow }
