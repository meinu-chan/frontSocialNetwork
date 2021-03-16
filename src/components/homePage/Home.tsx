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

interface RootState {
  user: User;
}

interface User {
  friends: [any];
  nickname: string;
  publications: [];
  _id: string;
  requests: [string];
  waitingForResponse: [string];
}

interface DefaultRootState {
  friends: [any];
  nickname: string;
  publications: any[];
  userId: string;
  requests: [string];
  follow: boolean;
}

export const Home: React.FC = () => {
  const [publics, setPublics] = React.useState<Array<any>>([]);
  const [myPage, setMyPage] = React.useState<boolean>(true);
  const id: string | null = sessionStorage.getItem("userId");

  const userState: DefaultRootState = useSelector(({ user }: RootState) => {
    const { nickname, _id, requests: _req, waitingForResponse, friends } = user;
    const follow = waitingForResponse.includes(
      sessionStorage.getItem("userId")!
    );
    return {
      friends,
      nickname,
      publications: publics,
      userId: _id,
      requests: _req,
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
        dispatch(setUser(res.data.potentialFriend));
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

  return (
    <div className="container home-main d-flex">
      <Header />
      <div className="user-about d-flex">
        <div className="user-page-nick-image d-flex">
          <div className="user-image"></div>
          <div className="user-nickname">{userState.nickname}</div>
        </div>
        {!myPage && (
          <div className="user-add-friend-button">
            <AddFriendButton
              sendFriendRequest={sendFriendRequest}
              follow={userState.follow}
              friends={userState.friends}
            />
          </div>
        )}
      </div>
      <div className="d-flex">
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
        <div className="col-3 ">
          <FriendsList />
        </div>
      </div>
    </div>
  );
};
