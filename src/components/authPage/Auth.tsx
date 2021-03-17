import React from "react";
import "./Auth.scss";
import Register from "./components/register/register";
import Login from "./components/login/login";

export const Auth: React.FC = () => {
  const [nickname, setNickname] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showLogin, setShowLogin] = React.useState<boolean>(false);

  const nicknameSetter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
  };

  const passwordSetter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const showLoginSetter = () => setShowLogin((prev) => !prev);

  return (
    <div className="authPage">
      <div className="auth d-flex">
        <form className="authForm d-flex flex-column">
          {(showLogin && (
            <Login
              nicknameSetter={nicknameSetter}
              passwordSetter={passwordSetter}
              showLoginSetter={showLoginSetter}
              nickname={nickname}
              password={password}
            />
          )) || (
            <Register
              nicknameSetter={nicknameSetter}
              passwordSetter={passwordSetter}
              showLoginSetter={showLoginSetter}
              nickname={nickname}
              password={password}
            />
          )}
        </form>
      </div>
    </div>
  );
};
