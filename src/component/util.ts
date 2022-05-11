
import JSEncrypt from "jsencrypt";
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
function encode(str: string) {
    const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAQVNdcHUMVdGfPpZGcjCxETmAgKZv2TCX+2SQim+bl86CLlpUVl+B4aGh0IcL4ybTSQvaaen/1kHjFJV9a4ZV3dn5jN3hxKp3zo7VXoFjMcH3U3haN/Eh132pe+FxbNHJfL4EAFPc/kE54I4Knwso5xe4ZzgW/WQOIMlADwNBywIDAQAB";
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(str)

}
const fromNow = (time: string) => dayjs(time).fromNow();
export { useThrottle, useDebounce, day, encode,fromNow }
