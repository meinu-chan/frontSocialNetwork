import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import "./publication.scss";

interface IPublication {
  _id: number;
  nickname: string;
  date: Date;
  value: string;
  likes: number;
  likedUsers: Array<String>;
  userId: string;
}
const Publication: React.FC<IPublication> = ({
  _id,
  nickname,
  date,
  value,
  likes,
  likedUsers,
  userId,
}) => {
  const [like, setLike] = React.useState<number>(likes);

  const ratePublic = () => {
    axios
      .put(
        `http://localhost:5000/api/`.concat("page/publication/rate"),
        {
          publicId: _id,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        const { flag } = res.data;
        const likeDiv = document.getElementById(`${_id}`)!;
        flag
          ? (likeDiv.style.color = "#ff1919 ")
          : (likeDiv.style.color = "#000 ");
        flag ? setLike(like + 1) : setLike(like - 1);
        return flag;
      });
  };

  React.useEffect(() => {
    const likeDiv = document.getElementById(`${_id}`)!;

    if (likedUsers.includes(userId)) {
      console.log("red");
      likeDiv.style.color = "#ff1919 ";
    } else {
      console.log("black");
      likeDiv.style.color = "#000 ";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateFormatter = (date: Date) => {
    return date.toDateString();
  };

  return (
    <div className="publication">
      <div className="publication-header d-flex ">
        <div className="publication-avatar"></div>
        <div className="publication-name">
          <h4>{nickname}</h4>
        </div>
        <div className="w-50"></div>
        <div className="publication-data">
          <p>{dateFormatter(new Date(date))}</p>
        </div>
      </div>
      <div className="publication-body">
        <p>{value}</p>
      </div>
      <div className="publication-bottom">
        <div className="publication-evaluation d-flex ">
          <div
            id={`${_id}`}
            className="publication-likes d-flex "
            onClick={ratePublic}
          >
            <div className="like">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <p>{like}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publication;
