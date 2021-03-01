import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { connect } from "react-redux";

import "./header.scss";

const Header: React.FC = () => {
  const nicknameRef = React.useRef<any>();
  const findByNickname = () => {
    nicknameRef.current &&
      axios
        .get(
          `http://localhost:5000/api/`.concat(
            `page/find/name/nickname=${nicknameRef.current.value}`
          ),
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          nicknameRef.current.value = "";
          document.location.href = "http://localhost:3000".concat(
            `/user/id=${res.data.user._id}`
          );
        });
  };

  return (
    <div className="main-header d-flex">
      <AppBar position="static" className="m-header">
        <div className="container">
          <Toolbar className="d-flex justify-content-between">
            <Typography className="col-10" variant="h6" noWrap>
              Social Network
            </Typography>
            <div className="main-header-search d-flex">
              <div className="header-searchIcon">
                <SearchIcon onClick={findByNickname} />
              </div>
              <input
                className="header-input"
                ref={nicknameRef}
                placeholder="Find user..."
              />
            </div>
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
};
export default connect()(Header);
