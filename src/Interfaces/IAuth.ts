import React from "react";

export default interface IAuth {
  nicknameSetter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordSetter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showLoginSetter: VoidFunction;
  handleLogin?: any;
  handleSignin?: any;
}
