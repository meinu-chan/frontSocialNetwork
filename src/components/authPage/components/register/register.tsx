import React from "react";
import {
  Button,
  FormGroup,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";

import IAuth from "../../../../Interfaces/IAuth";

const register: React.FC<IAuth> = ({
  nicknameSetter,
  passwordSetter,
  showLoginSetter,
  handleSignin,
}) => {
  return (
    <>
      <h2>Sign In</h2>
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
          <p id="linkToRegister" className="log-sign" onClick={showLoginSetter}>
            I already have account.
          </p>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleSignin}
          >
            Sign In
          </Button>
        </div>
      </div>
    </>
  );
};

export default register;
