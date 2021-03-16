import React from "react";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./friendRequests.scss";

import { setUser } from "../../../../../redux/actions/user";
import { setFriends } from "../../../../../redux/actions/friends";

interface RootState {
  user: User;
}

interface User {
  nickname: string;
  publications: [];
  _id: string;
  requests: [string];
  waitingForResponse: [string];
  friends: any[];
}

interface DefaultRootState {
  waitingForResponse: [string];
  _id: string;
  friends: any[];
  nickname: string;
}

export default function FriendRequests() {
  const [showReq, setShowReq] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<any[]>([]);

  const dispatch = useDispatch();

  const friendReqState: DefaultRootState = useSelector(
    ({ user }: RootState) => {
      const { waitingForResponse, _id, friends, nickname } = user;

      return { waitingForResponse, _id, friends, nickname };
    }
  );

  const { waitingForResponse, _id, nickname } = friendReqState;

  React.useEffect(() => {
    waitingForResponse.length > 0 &&
      waitingForResponse.forEach((id) =>
        axios
          .get(
            `${process.env.REACT_APP_SERVER_URL}`.concat(`page/find/id=${id}`),
            {
              headers: {
                Authorization: sessionStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            const { user } = res.data;
            setUsers((prev) => [...prev, user]);
          })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (userId: string, status: boolean) =>
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}`.concat("page/friends/add"),
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
      .then((res) => {
        const { user } = res.data;
        setUsers([...user.waitingForResponse]);
        dispatch(setUser(user));
      })
      .then(() => {
        if (status) {
          axios
            .get(
              `${process.env.REACT_APP_SERVER_URL}`.concat(
                `page/friends/id=${_id}`
              ),
              {
                headers: {
                  Authorization: sessionStorage.getItem("token"),
                },
              }
            )
            .then((res) => dispatch(setFriends(res.data.friends)));
        }
      });

  window.onclick = (e: any) => {
    if (
      !e.target.closest("div").matches(".friend-req-badge") &&
      !e.target.closest("div").matches(".friend-req-drop-user")
    ) {
      setShowReq(false);
    }
  };

  return (
    <div
      className="friend-req-badge"
      onClick={() => setShowReq((prev) => !prev)}
    >
      <Badge badgeContent={waitingForResponse.length} color="secondary">
        <NotificationsIcon />
      </Badge>
      {showReq && (
        <div className="friend-req-drop">
          {(users.length > 0 &&
            users.map((user: any, index: number) => (
              <div
                className="d-flex friend-req-drop-user"
                key={`${user._id}_${index}`}
              >
                <div className="d-flex align-items-center w-100">
                  <div className="friend-req-img"></div>
                  <div className="f-req-nickname">{user.nickname}</div>
                </div>
                <div className="d-flex f-req-todo">
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
              </div>
            ))) || (
            <div className="friend-req-empty-list d-flex">
              No friend requests
            </div>
          )}
        </div>
      )}
    </div>
  );
}
