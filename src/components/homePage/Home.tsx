import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import "./Home.scss";

import FriendsList from "./components/friendsList/friendsList";
import CreatePublication from "./components/createPublication/createPublication";
import Publication from "./components/publication/publication";
import Header from "./components/header/header";

import { setUser } from "../../redux/actions/user";

interface RootState {
  user: User;
}

interface User {
  nickname: string;
  publications: [];
  _id: string;
}

interface DefaultRootState {
  nickname: string;
  publications: any[];
  userId: string;
}

export const Home: React.FC = () => {
  const [publics, setPublics] = React.useState<Array<any>>([]);

  const userState: DefaultRootState = useSelector(({ user }: RootState) => {
    const { nickname, _id: userId } = user;

    return {
      nickname,
      publications: publics,
      userId,
    };
  });

  const getAllPublications = React.useCallback(() => {
    userState.userId &&
      axios
        .get(
          `http://localhost:5000/api/`.concat(
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

  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/`.concat("page"), {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(setUser(res.data.user));
        getAllPublications();
      });
  }, [dispatch, getAllPublications]);

  return (
    <div className="container home-main d-flex">
      <Header />
      <div className="user-about d-flex">
        <div className="user-image"></div>
        <div className="user-nickname">{userState.nickname}</div>
      </div>
      <div className="d-flex">
        <div className="user-body d-flex col-8">
          <div className="user-create-publication">
            <CreatePublication getPublications={getAllPublications} />
          </div>
          <div className="user-data d-flex flex-column-reverse">
            {(publics &&
              publics.length > 0 &&
              publics.map((publication, index) => {
                return (
                  <div
                    key={`${index}_${Date.now()}`}
                    className={`user-publication ${
                      index === 0 ? "publication-last" : ""
                    }`}
                  >
                    {publication && (
                      <Publication
                        {...publication}
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
