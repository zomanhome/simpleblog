import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import promise from "redux-promise";
import rootReducer from "./reducers";

import PostNew from "./components/post_new";
import Post from "./components/post";
import PostsAll from "./components/posts_all";
import "./index.css";

const composeEnhancers = composeWithDevTools({});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promise))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/posts/new" component={PostNew} />
        <Route path="/posts/:id" component={Post} />
        <Route path="/" component={PostsAll} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
