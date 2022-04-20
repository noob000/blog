import { message } from 'antd';
import { useEffect, useCallback, useRef } from 'react';

function useThrottle(fn: Function, delay = 2000, dep: any[] = []) {
  const { current } = useRef({ fn, timer: null })
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer
      }, delay)
      current.fn.call(this, ...args)
    }
    else {
      message.warn("请不要短时间连续点击！");
    }
  }, dep)
}

export default useThrottle;

