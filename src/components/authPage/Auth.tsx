import React from "react";
import axios from "axios";
import {
  Button,
  FormGroup,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import "./Auth.scss";

export const Auth: React.FC = () => {
  const [nickname, setNickname] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showLogin, setShowLogin] = React.useState<boolean>(false);

  const handleLogin = (e: any) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/`.concat("auth/login"), {
        nickname,
        password,
      })
      .then(
        (res) => {
          res.status === 200
            ? (document.location.href = "/home")
            : console.log(res.status);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const handleSignin = (e: any) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/`.concat("auth/register"), {
        nickname,
        password,
      })
      .then(
        (res) => {
          res.status === 201
            ? (document.location.href = "/home")
            : console.log(res.status);
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

  return (
    <form className="authForm">
      {(showLogin && (
        <div className="authDiv">
          <FormGroup id="auth">
            <FormControl>
              <InputLabel>Nickname</InputLabel>
              <Input
                aria-describedby="my-helper-text"
                onChange={nicknameSetter}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input
                aria-describedby="my-helper-text"
                type="password"
                onChange={passwordSetter}
              />
            </FormControl>
          </FormGroup>
          <div className="authBottom">
            <p
              id="linkToRegister"
              className="log-sign"
              onClick={() => setShowLogin(false)}
            >
              I don't have account.
            </p>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Log In
            </Button>
          </div>
        </div>
      )) || (
        <div className="authDiv">
          <FormGroup id="auth">
            <FormControl>
              <InputLabel>Nickname</InputLabel>
              <Input
                aria-describedby="my-helper-text"
                onChange={nicknameSetter}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input
                aria-describedby="my-helper-text"
                type="password"
                onChange={passwordSetter}
              />
            </FormControl>
          </FormGroup>
          <div className="authBottom">
            <p
              id="linkToLogin"
              className="log-sign"
              onClick={() => setShowLogin(true)}
            >
              I already have account.
            </p>
            <Button
              type="button"
              onClick={handleSignin}
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};
