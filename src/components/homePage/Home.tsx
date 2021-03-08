import React from "react";
import axios from "axios";

import "./Home.scss";

import FriendsList from "./components/friendsList/friendsList";
import CreatePublication from "./components/createPublication/createPublication";
import Publication from "./components/publication/publication";
import Header from "./components/header/header";

export const Home: React.FC = () => {
  const [nickname, setNickname] = React.useState<string>("");
  const [publications, setPublications] = React.useState<Array<any>>([]);
  const [userId, setUserId] = React.useState<string>();

  const getAllPublications = React.useCallback(() => {
    userId &&
      axios
        .get(
          `http://localhost:5000/api/`.concat(`publication/getAll/${userId}`)
        )
        .then((res) => {
          setPublications(res.data.publications);
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
      .get(`http://localhost:5000/api/`.concat("page"), {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNickname(res.data.nickname);
        setUserId(res.data._id);
        console.log(">>>>", userId);
        getAllPublications();
      });
  }, [getAllPublications, userId]);

  return (
    <div className="container home-main d-flex">
      <Header />
      <div className="user-about d-flex">
        <div className="user-image"></div>
        <div className="user-nickname">{nickname}</div>
      </div>
      <div className="d-flex">
        <div className="user-body d-flex col-8">
          <div className="user-create-publication">
            <CreatePublication getPublications={getAllPublications} />
          </div>
          <div className="user-data d-flex flex-column-reverse">
            {(publications &&
              publications.length > 0 &&
              publications.map((publication, index) => {
                return (
                  <div
                    key={`${index}_${Date.now()}`}
                    className={`user-publication ${
                      index === 0 ? "publication-last" : ""
                    }`}
                  >
                    {publication && (
                      <Publication {...publication} nickname={nickname} />
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
