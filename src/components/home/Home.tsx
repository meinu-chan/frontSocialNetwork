import React from "react";
import axios from "axios";

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

  return <div>{nickname}</div>;
};
