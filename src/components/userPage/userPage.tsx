import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import "./userPage.scss";

import Header from "../homePage/components/header/header";
import FriendsList from "../homePage/components/friendsList/friendsList";
import Publication from "../homePage/components/publication/publication";

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
  publications: [any];
  userId: string;
}

const UserPage: React.FC = () => {
  const [publics, setPublics] = React.useState<any>();
  const dispatch = useDispatch();

  const userState: DefaultRootState = useSelector(({ user }: RootState) => {
    const { nickname, _id } = user;

    return { nickname, publications: publics, userId: _id };
  });

  const { nickname, publications, userId } = userState;

  React.useMemo(() => {
    userId &&
      axios
        .get(
          `http://localhost:5000/api/`.concat(`publication/getAll/${userId}`)
        )
        .then((res) => {
          setPublics(res.data.publications);
        })
        .catch((err) => {
          if (err.response) {
            err.response.status === 401
              ? (document.location.href = "/")
              : console.log(err.response);
          }
        });
  }, [userId]);

  React.useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/`.concat(
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
      })
      .then(() => {});
  }, [dispatch]);
  return (
    <div className="container home-main d-flex">
      <Header />
      <div className="user-about d-flex">
        <div className="user-image"></div>
        <div className="user-nickname">{nickname}</div>
      </div>
      <div className="d-flex">
        <div className="user-body d-flex col-8">
          <div className="user-data">
            <ul className="main-ul d-flex flex-column-reverse">
              {(publications &&
                publications.length > 0 &&
                publications.map((publication) => {
                  return (
                    <div key={`${publication._id}`}>
                      {publication && (
                        <li className="user-publication">
                          <Publication {...publication} nickname={nickname} />
                        </li>
                      )}
                    </div>
                  );
                })) || (
                <div className="user-publications-empty">
                  There is no publications.
                </div>
              )}
            </ul>
          </div>
        </div>
        <div className="col-3">
          <FriendsList />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
