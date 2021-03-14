// import { AdjustSharp } from "@material-ui/icons";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Auth } from "./components/authPage/Auth";
import { Home } from "./components/homePage/Home";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={process.env.REACT_APP_CLIENT_URL}>
        <Route path="/" exact component={Auth} />
        <Route path="/:id" exact component={Home} />
      </BrowserRouter>
    );
  }
}

export default App;
