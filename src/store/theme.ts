import { action, makeAutoObservable, observable } from "mobx";

class Theme {
    @observable theme: "dark" | "light";
    constructor() {
        makeAutoObservable(this);
        this.inital()
        this.setTheme = this.setTheme.bind(this);
    }
    @action.bound
    setTheme(val: "dark" | "light") {
        this.theme = val
    }
    private inital() {
        const hour = new Date().getHours();
        if (hour > 20 || hour < 7) this.theme = "dark";
        else this.theme = "light"

    }
}
const ThemeStore = new Theme();
export default ThemeStore
export { Theme }