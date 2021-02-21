// import { AdjustSharp } from "@material-ui/icons";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Auth } from "./components/authPage/Auth";
import { Home } from "./components/home/Home";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Auth} />
        <Route path="/home" component={Home} />
      </BrowserRouter>
    );
  }
}

export default App;
