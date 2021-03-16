import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";
import axios from "axios";

import "./header.scss";

import FriendRequests from "./components/friendRequests";

interface RootState {
  user: User;
}

interface User {
  nickname: string;
  publications: [];
  _id: string;
  requests: [string];
  waitingForResponse: [string];
}

interface DefaultRootState {
  userId: string;
  waitingForResponse: [string];
}

const Header: React.FC = () => {
  const nicknameRef = React.useRef<any>();
  const anchorElRef = React.useRef<null | HTMLDivElement>(null);
  const [render, setRender] = React.useState<boolean>(true);

  const headerState: DefaultRootState = useSelector(({ user }: RootState) => {
    const { waitingForResponse, _id: userId } = user;

    return { waitingForResponse, userId };
  });

  const { waitingForResponse, userId } = headerState;

  React.useEffect(() => {
    userId === sessionStorage.getItem("userId")
      ? setRender(true)
      : setRender(false);
  }, [userId]);

  const findByNickname = () => {
    console.log(nicknameRef.current);
    nicknameRef.current &&
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}`.concat(
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
          document.location.href = `${process.env.REACT_APP_CLIENT_URL}`.concat(
            `id=${res.data.user._id}`
          );
        });
  };

  return (
    <div className="main-header d-flex">
      <AppBar position="static" className="m-header">
        <div className="container">
          <Toolbar className="d-flex justify-content-between">
            <Typography className="col-9" variant="h6" noWrap>
              Social Network
            </Typography>
            {render && (
              <div className="badge-icon-header" ref={anchorElRef}>
                <FriendRequests waitingForResponse={waitingForResponse} />
              </div>
            )}

            <div
              className="main-header-search d-flex"
              style={render ? { flexGrow: 1 } : { flexGrow: 0 }}
            >
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
export default Header;
