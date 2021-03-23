import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import "./Home.scss";

import FriendsList from "./components/friendsList/friendsList";
import CreatePublication from "./components/createPublication/createPublication";
import Publication from "./components/publication/publication";
import Header from "./components/header/header";
import AddFriendButton from "./components/addFriendButton/addFriendButton";

import { setUser } from "../../redux/actions/user";
import {
  IFriend,
  IPublication,
  IWaiting,
} from "../../Interfaces/BasicInterfaces";
import { Button } from "@material-ui/core";

interface RootState {
  user: User;
}

interface User {
  friends: IFriend[];
  nickname: string;
  publications: IPublication[];
  _id: string;
  requests: [string];
  waitingForResponse: IWaiting[];
}

interface DefaultRootState {
  friends: IFriend[];
  nickname: string;
  publications: IPublication[];
  userId: string;
  requests: [string];
  follow: boolean;
}

export const Home: React.FC = () => {
  const [publics, setPublics] = React.useState<Array<any>>([]);
  const [myPage, setMyPage] = React.useState<boolean>(true);
  const id: string | null = sessionStorage.getItem("userId");

  const userState: DefaultRootState = useSelector(({ user }: RootState) => {
    const { nickname, _id, requests, waitingForResponse, friends } = user;
    let follow = false;
    waitingForResponse?.forEach((user: IWaiting) => {
      if (user.waiterId === sessionStorage.getItem("userId")) {
        follow = true;
      }
    });

    return {
      friends,
      nickname,
      publications: publics,
      userId: _id,
      requests,
      follow,
    };
  });

  const getAllPublications = React.useCallback(() => {
    userState.userId &&
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}`.concat(
            `publication/getAll/${userState.userId}`
          )
        )
        .then((res) => {
          setPublics(res.data.publications);
        })
        .catch((err) => {
          if (err.response) {
            err.response.status >= 400
              ? (document.location.href = "/")
              : console.log(err.response);
          }
        });
  }, [userState.userId]);

  const sendFriendRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}`.concat("page/friends/send"),
        {
          userId: userState.userId,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        if (err.response) {
          err.response.status === 401
            ? (document.location.href = "/")
            : console.log(err.response);
        }
      });
  };

  const deleteFriend = () => {
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}`.concat("page/friends/delete"),
        {
          userId: userState.userId,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        if (err.response) {
          err.response.status === 401
            ? (document.location.href = "/")
            : console.log(err.response);
        }
      });
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}`.concat(
          `page/find/${window.location.href.split("/").pop()}`
        ),
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        dispatch(setUser(res.data.user));
        setMyPage(userState.userId === id);
        getAllPublications();
      })
      .catch((err) => {
        if (err.response) {
          err.response.status === 401
            ? (document.location.href = "/")
            : console.log(err.response);
        }
      });
  }, [dispatch, getAllPublications, id, userState.userId]);

  const classCheckerForPublication = (index: number): string => {
    if (!myPage && publics.length === 1) {
      return "user-publication publication-single";
    } else if (index === 0) {
      return "user-publication publication-last";
    } else if (!myPage && index === publics.length - 1) {
      return "user-publication publication-first";
    }
    return "user-publication";
  };

  const logOut = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}`.concat("auth/logout"))
      .then(() => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        document.location.href = "/";
      });
  };

  return (
    <div className="container home-main d-flex">
      <Header />
      <div className="user-about d-flex">
        <div className="user-page-nick-image d-flex">
          <div className="user-image"></div>
          <div className="user-nickname">{userState.nickname}</div>
        </div>
        {(!myPage && (
          <div className="user-add-friend-button">
            <AddFriendButton
              sendFriendRequest={sendFriendRequest}
              deleteFriend={deleteFriend}
              follow={userState.follow}
              friends={userState.friends}
            />
          </div>
        )) || (
          <div>
            <Button variant="outlined" onClick={logOut}>
              Log Out
            </Button>
          </div>
        )}
      </div>
      <div className="user-root d-flex justify-content-around">
        <div className="user-body d-flex col-8">
          {myPage && (
            <div className="user-create-publication">
              <CreatePublication getPublications={getAllPublications} />
            </div>
          )}
          <div className="user-data d-flex flex-column-reverse">
            {(publics &&
              publics.length > 0 &&
              publics.map((publication, index) => {
                return (
                  <div
                    key={`${index}_${Date.now()}`}
                    className={classCheckerForPublication(index)}
                  >
                    {publication && (
                      <Publication
                        {...publication}
                        getAllPublications={getAllPublications}
                        nickname={userState.nickname}
                      />
                    )}
                  </div>
                );
              })) || (
              <div className="user-publications-empty">
                There is no publications.
              </div>
            )}
          </div>
        </div>
        <div className="user-friends-root col-3 ">
          <FriendsList friends={userState.friends} />
        </div>
      </div>
    </div>
  );
};
