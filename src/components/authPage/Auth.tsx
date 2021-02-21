import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./Auth.scss";
import Register from "./components/register/register";
import Login from "./components/login/login";

export const Auth: React.FC = () => {
  const [nickname, setNickname] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showLogin, setShowLogin] = React.useState<boolean>(false);

  const handleLogin = (e: any): void => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/`.concat("auth/login"), {
        nickname,
        password,
      })
      .then(
        (res) => {
          sessionStorage.setItem("token", res.data.token);
          // window.store.dispatch(getToken(res.data.token));
          // axios.defaults.headers.common["Authorization"] = res.data.token;
          console.log(res.config);
          res.status === 200
            ? (document.location.href = "/home")
            : console.log(res.status);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const handleSignin = (e: any): void => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/`.concat("auth/register"), {
        nickname,
        password,
      })
      .then(
        (res) => {
          axios.defaults.headers.common["Authorization"] = res.data.token;
          // res.status === 201
          //   ? (document.location.href = "/home")
          //   : console.log(res.status);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const nicknameSetter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
  };

  const passwordSetter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const showLoginSetter = () => setShowLogin((prev) => !prev);

  return (
    <div className="authPage">
      <div className="auth">
        <form className="authForm">
          {(showLogin && (
            <Login
              nicknameSetter={nicknameSetter}
              passwordSetter={passwordSetter}
              showLoginSetter={showLoginSetter}
              handleLogin={handleLogin}
            />
          )) || (
            <Register
              nicknameSetter={nicknameSetter}
              passwordSetter={passwordSetter}
              showLoginSetter={showLoginSetter}
              handleSignin={handleSignin}
            />
          )}
        </form>
      </div>
    </div>
  );
};
