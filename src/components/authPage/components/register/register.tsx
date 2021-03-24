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

const register: React.FC<IAuth> = ({
  nicknameSetter,
  passwordSetter,
  showLoginSetter,
  nickname,
  password,
}) => {
  const [showError, setShowError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const [showPasswordError, setShowPasswordError] = React.useState<boolean>(
    false
  );

  const regexpPass = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
  const regexNick = /[0-9a-zA-Z!@#$%^&*]{3,}/g;

  const handleSignin = (e: any): void => {
    e.preventDefault();
    setShowPasswordError(() => false);
    setShowError(false);
    nickname.match(regexNick) &&
      password.match(regexpPass) &&
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}`.concat("auth/register"), {
          nickname,
          password,
        })
        .then(
          (res) => {
            sessionStorage.setItem("userId", res.data.userId);
            sessionStorage.setItem("token", res.data.token);
            res.status === 201
              ? (document.location.href = `/id=${res.data.userId}`)
              : console.log(res.status);
          },
          (err) => {
            if (err.response) {
              console.log(err.response);
              setShowError(true);
              setError(err.response.data.message);
            } else if (err.request) {
              console.log(err.request);
            } else {
              console.log(err);
            }
          }
        );

    if (!nickname.match(regexNick)) {
      setShowError(true);
      setError("Must contain at least 3 characters");
    }
    if (!password.match(regexpPass)) setShowPasswordError(true);
  };

  return (
    <>
      <h2>Sign Up</h2>
      <div className="authDiv">
        <FormGroup id="auth">
          <FormControl>
            <InputLabel>Nickname</InputLabel>
            <Input
              aria-describedby="my-helper-text"
              onChange={nicknameSetter}
            />
            {showError && <p className="error">{error}</p>}
          </FormControl>
          <FormControl>
            <InputLabel>Password</InputLabel>
            <Input
              aria-describedby="my-helper-text"
              type="password"
              onChange={passwordSetter}
            />
            {showPasswordError && (
              <p className="error">
                Must contain A-Z, a-z, 0-9, !,@,#,$,%,^,&,*
              </p>
            )}
          </FormControl>
        </FormGroup>
        <div className="authBottom">
          <p id="linkToRegister" className="log-sign" onClick={showLoginSetter}>
            I already have account.
          </p>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={handleSignin}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
};

export default register;
