/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  Button,
  FormGroup,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import axios from "axios";

import IAuth from "../../../../Interfaces/IAuth";

const login: React.FC<IAuth> = ({
  nicknameSetter,
  passwordSetter,
  showLoginSetter,
  nickname,
  password,
}) => {
  const [showError, setShowError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const handleLogin = (e: any): void => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/`.concat("auth/login"), {
        nickname,
        password,
      })
      .then(
        (res) => {
          sessionStorage.setItem("userId", res.data.userId);
          sessionStorage.setItem("token", res.data.token);
          res.status === 200
            ? (document.location.href = `/id=${res.data.userId}`)
            : console.log(res.status);
        },
        (err) => {
          if (err.response) {
            setShowError(true);
            setError(err.response.data.message);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log(err);
          }
        }
      );
  };

  return (
    <>
      <h2>Log In</h2>
      {showError && <p className="error">{error}</p>}
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
          <p id="linkToLogin" className="log-sign" onClick={showLoginSetter}>
            I don't have account.
          </p>
          <Button
            type="button"
            onClick={handleLogin}
            variant="outlined"
            color="primary"
          >
            Log In
          </Button>
        </div>
      </div>
    </>
  );
};

export default login;
