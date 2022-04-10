
import { useRef } from "react";
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
function day(){
    let newDate = Number(new Date());
    let oldDate = Number(new Date(new Date().getFullYear().toString()))
    return Math.ceil((newDate-oldDate)/(24*60*60*1000))+32;
}
export { useThrottle, useDebounce,day }
