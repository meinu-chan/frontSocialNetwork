import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
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
}

const Header: React.FC = () => {
  const nicknameRef = React.useRef<any>();
  const anchorElRef = React.useRef<null | HTMLDivElement>(null);
  const [render, setRender] = React.useState<boolean | null>(true);

  const headerState: DefaultRootState = useSelector(({ user }: RootState) => {
    const { _id: userId } = user;

    return { userId };
  });

  const { userId } = headerState;

  React.useEffect(() => {
    if (sessionStorage.getItem("userId")) {
      userId === sessionStorage.getItem("userId")
        ? setRender(true)
        : setRender(false);
    } else {
      setRender(null);
    }
  }, [userId]);

  const findByNickname = () => {
    nicknameRef.current &&
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}`.concat(
            `page/find/nickname=${nicknameRef.current.value}`
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
        })
        .catch((err) => {
          if (err.response) {
            err.response.status === 401
              ? (document.location.href = "/")
              : console.log(err.response);
          }
        });
  };

  const goMyPage = () => {
    document.location.href = sessionStorage.getItem("userId")
      ? `${process.env.REACT_APP_CLIENT_URL}`.concat(
          `id=${sessionStorage.getItem("userId")}`
        )
      : "/";
  };

  return (
    <div className="main-header d-flex">
      <AppBar position="static" className="m-header">
        <div className="container">
          <Toolbar className="d-flex justify-content-between flex-wrap align-center">
            <Typography
              variant="h6"
              noWrap
              onClick={goMyPage}
              className="d-flex header-typography"
            >
              <div className="header-logo">Social Network</div>
              {render !== null && !render && (
                <div className="header-link-my-page">My page</div>
              )}
            </Typography>
            <div className="d-flex align-items-center root-nav">
              {render && (
                <div className="badge-icon-header" ref={anchorElRef}>
                  <FriendRequests />
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
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      findByNickname();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  className="header-search-btn"
                  onClick={findByNickname}
                >
                  Search
                </Button>
              </div>
            </div>
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
};
export default Header;
