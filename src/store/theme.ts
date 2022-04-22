import { action, makeAutoObservable, observable } from "mobx";
import { lightStr, darkStr } from "@/styleStr";
class Theme {
    @observable theme: "dark" | "light";
    constructor() {
        makeAutoObservable(this);
        this.inital()
        this.setTheme = this.setTheme.bind(this);
    }
    @action.bound
    setTheme(val: "dark" | "light") {
        this.theme = val;
        if (val === "dark") {
            loadStyleString(lightStr)
        }
        else loadStyleString(darkStr)

    }
    private inital() {
        const hour = new Date().getHours();

        if (hour > 20 || hour < 7) {
            this.theme = "dark";
            loadStyleString(lightStr)
        }
        else {
            this.theme = "light";
            loadStyleString(darkStr)
        }
    }
}
const ThemeStore = new Theme();
export default ThemeStore
export { Theme }
function loadStyleString(cssText: string) {
    var style = document.createElement("style");
    style.type = "text/css";
    try {
        // firefox、safari、chrome和Opera
        style.appendChild(document.createTextNode(cssText));
    } catch (ex) {
        // IE早期的浏览器 ,需要使用style元素的stylesheet属性的cssText属性
        (style as any).styleSheet.cssText = cssText;
    }
    document.getElementsByTagName("head")[0].appendChild(style);
}