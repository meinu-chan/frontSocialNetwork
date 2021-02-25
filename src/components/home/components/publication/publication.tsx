import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import Comment from "./components/comment/comment";
import AddComment from "./components/addComment/addComment";

import "./publication.scss";

interface IPublication {
  _id: number;
  nickname: string;
  date: Date;
  value: string;
  likes: number;
  likedUsers: Array<String>;
  userId: string;
  comments: Array<string>;
}
const Publication: React.FC<IPublication> = ({
  _id,
  nickname,
  date,
  value,
  likes,
  likedUsers,
  userId,
  comments,
}) => {
  const [like, setLike] = React.useState<number>(likes);

  const [coms, setComs] = React.useState<Array<string>>(comments);

  const ratePublic = () => {
    axios
      .put(
        `http://localhost:5000/api/`.concat("publication/rate"),
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
      })
      .catch((err) => {
        if (err.response) {
          err.response.status === 401
            ? (document.location.href = "/")
            : console.log(err.response);
        }
      });
  };

  React.useEffect(() => {
    const likeDiv = document.getElementById(`${_id}`)!;

    if (likedUsers.includes(userId)) {
      likeDiv.style.color = "#ff1919 ";
    } else {
      likeDiv.style.color = "#000 ";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateFormatter = (date: Date) => {
    return `${date.getHours()}:${date.getMinutes()} ${date.toDateString()}`;
  };

  return (
    <div className="publication">
      <div className="publication-main">
        <div className="publication-header d-flex ">
          <div className="publication-avatar col-1"></div>
          <div className="publication-name col-4">
            <h4>{nickname}</h4>
          </div>
          <div className="col-2"></div>
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
      <div className="publication-comments">
        <div className="addComment">
          <AddComment publicId={_id.toString()} updateComments={setComs} />
        </div>
        <ul className="d-flex flex-column-reverse">
          {coms.map((comment, index) => {
            return (
              <div key={`${index}_${comment}`}>
                <Comment commentId={comment} />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Publication;
