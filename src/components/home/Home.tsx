import React from "react";
import axios from "axios";

import "./Home.scss";

import FriendsList from "./components/friendsList/friendsList";
import CreatePublication from "./components/createPublication/createPublication";
export const Home: React.FC = () => {
  const [nickname, setNickname] = React.useState<string>("");

  React.useEffect(() => {
    console.log(sessionStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/api/`.concat("page"), {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setNickname(res.data.nickname);
      });
  }, []);

  return (
    <>
      <FriendsList />
      <CreatePublication />
    </>
    // <div className="container home-main d-flex">
    //   <div className="user-image"></div>
    //   <div className="user-data">
    //     <ul className="main-ul d-flex">
    //       <li className="user-nickname">{nickname}</li>
    //       <li>
    //       </li>
    //
    //     </ul>
    //   </div>
    // </div>
  );
};
