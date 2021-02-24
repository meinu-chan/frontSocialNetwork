import React from "react";
import axios from "axios";

import "./Home.scss";

import FriendsList from "./components/friendsList/friendsList";
import CreatePublication from "./components/createPublication/createPublication";
import Publication from "./components/publication/publication";

export const Home: React.FC = () => {
  const [nickname, setNickname] = React.useState<string>("");
  const [publications, setPublications] = React.useState<Array<any>>();

  React.useEffect(() => {
    // console.log(sessionStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/api/`.concat("page"), {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNickname(res.data.nickname);
        getAllPublications();
      });
  }, []);

  // console.log(publications);

  const getAllPublications = () => {
    axios
      .get(`http://localhost:5000/api/`.concat("page/publication/getAll"), {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPublications(res.data.publications);
        console.log(res);
      });
  };

  // publications && getAllPublications(publications);

  return (
    <div className="container home-main d-flex">
      <div className="user-about d-flex">
        <div className="user-image"></div>
        <div className="user-nickname">{nickname}</div>
      </div>
      <div className="d-flex">
        <div className="col-5 ">
          <FriendsList />
        </div>
        <div className="user-body d-flex col-6">
          <div className="user-create-publication">
            <CreatePublication getPublications={getAllPublications} />
          </div>
          <div className="user-data">
            <ul className="main-ul d-flex flex-column-reverse">
              {publications &&
                publications.map((publication, index) => {
                  return (
                    <div key={`${index}_${Date.now()}`}>
                      {publication && (
                        <li className="user-publication">
                          <Publication {...publication} nickname={nickname} />
                        </li>
                      )}
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
