import React from "react";
import axios from "axios";
import { Menu, MenuItem } from "@material-ui/core/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

import { setFriends } from "../../../../../redux/actions/friends";
import { setUser } from "../../../../../redux/actions/user";

import "./friendRequests.scss";

const ITEM_HEIGHT = 48;

interface IFriendRequest {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  waitForRes: [string];
}

export default function FriendRequest({
  anchorEl,
  open,
  handleClose,
  waitForRes,
}: IFriendRequest) {
  const [users, setUsers] = React.useState<any>([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    waitForRes.forEach((id) =>
      axios
        .get(`http://localhost:5000/api/`.concat(`page/find/id=${id}`), {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          const { user } = res.data;
          setUsers((prev: any) => [...prev, user]);
        })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (userId: string, status: boolean) => {
    axios
      .put(
        "http://localhost:5000/api".concat("/page/friends/add"),
        {
          userId,
          status,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => dispatch(setUser(res.data.user)));

    if (status) {
      axios
        .get(`http://localhost:5000/api/`.concat(`page/find/${userId}`), {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })
        .then((res) => dispatch(setFriends(res.data.user)));
    }
  };

  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "20ch",
        },
      }}
      className="f-req-menu"
    >
      <div className="friend-req-list">Friend Requests </div>
      {(users.length > 0 &&
        users.map((user: any, index: number) => {
          return (
            user && (
              <MenuItem
                key={`${user._id}_${index}`}
                selected={user._id === "Pyxis"}
                onClick={handleClose}
              >
                <div className="d-flex align-items-center w-100">
                  <div className="friend-req-img"></div>
                  <div className="f-req-nickname">{user.nickname}</div>
                </div>
                <div className="f-req-todo">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="f-req-todo-accept"
                    onClick={() => handleAnswer(user._id, true)}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="f-req-todo-decline"
                    onClick={() => handleAnswer(user._id, false)}
                  />
                </div>
              </MenuItem>
            )
          );
        })) || <div className="f-req-empty d-flex">No friend requests</div>}
    </Menu>
  );
}
