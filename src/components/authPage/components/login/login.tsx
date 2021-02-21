import React from "react";
import {
  Button,
  FormGroup,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";

import IAuth from "../../../../Interfaces/IAuth";

const login: React.FC<IAuth> = ({
  nicknameSetter,
  passwordSetter,
  showLoginSetter,
  handleLogin,
}) => {
  return (
    <>
      <h2>Log In</h2>
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
            variant="contained"
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
