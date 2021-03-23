import React from "react";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./friendRequests.scss";

import { setUser } from "../../../../../redux/actions/user";
import { IFriend, IWaiting } from "../../../../../Interfaces/BasicInterfaces";

interface RootState {
  user: User;
}

interface User {
  nickname: string;
  publications: [];
  requests: [string];
  waitingForResponse: IWaiting[];
  friends: IFriend[];
}

interface DefaultRootState {
  waitingForResponse: IWaiting[];
}

export default function FriendRequests() {
  const [showReq, setShowReq] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const friendReqState: DefaultRootState = useSelector(
    ({ user }: RootState) => {
      const { waitingForResponse } = user;

      return { waitingForResponse };
    }
  );

  const { waitingForResponse } = friendReqState;

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
        const { data } = res;
        dispatch(setUser(data));
      })
      .catch((err) => {
        if (err.response) {
          err.response.status === 401
            ? (document.location.href = "/")
            : console.log(err.response);
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

  const handleToFriendPage = (id: string) => {
    document.location.href = `${process.env.REACT_APP_CLIENT_URL}id=${id}`;
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
          {(waitingForResponse.length > 0 &&
            waitingForResponse.map((user: any, index: number) => (
              <div
                className="d-flex friend-req-drop-user"
                key={`${user.waiterId}_${index}`}
              >
                <div className="d-flex align-items-center w-100">
                  <div className="friend-req-img"></div>
                  <div
                    className="f-req-nickname"
                    onClick={() => handleToFriendPage(user.waiterId)}
                  >
                    {user.waiterNickname}
                  </div>
                </div>
                <div className="d-flex f-req-todo">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="f-req-todo-accept"
                    onClick={() => handleAnswer(user.waiterId, true)}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="f-req-todo-decline"
                    onClick={() => handleAnswer(user.waiterId, false)}
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
