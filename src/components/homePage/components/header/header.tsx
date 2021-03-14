import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
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
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <>
      {render && (
        <FriendRequests
          waitForRes={waitingForResponse}
          anchorEl={anchorElRef.current}
          open={open}
          handleClose={handleClose}
        />
      )}
      <div className="main-header d-flex">
        <AppBar position="static" className="m-header">
          <div className="container">
            <Toolbar className="d-flex justify-content-between">
              <Typography className="col-9" variant="h6" noWrap>
                Social Network
              </Typography>
              <div
                className="badge-icon-header"
                ref={anchorElRef}
                onClick={handleClick}
              >
                {render && (
                  <IconButton color="inherit">
                    <Badge
                      badgeContent={waitingForResponse.length}
                      color="secondary"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                )}
              </div>

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
    </>
  );
};
export default Header;
