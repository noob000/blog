import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom";
import App from "./routes/blog";
import articleStore from "./store/article";
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App articleStore={articleStore} />
        </Router>
    </React.StrictMode >,
    document.getElementById('root')
);