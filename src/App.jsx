// import { AdjustSharp } from "@material-ui/icons";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Auth } from "./components/authPage/Auth";
import { Home } from "./components/homePage/Home";
import UserPage from "./components/userPage/userPage";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Auth} />
        <Route path="/:id" exact component={Home} />
        <Route path="/user/:id" component={UserPage} />
      </BrowserRouter>
    );
  }
}

export default App;
