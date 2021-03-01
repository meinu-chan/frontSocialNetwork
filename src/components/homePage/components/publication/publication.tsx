import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import ModalWindow from "./components/modalWindow/modalWindow";

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

  const [showComments, setShowComments] = React.useState<boolean>(false);

  const ratePublic = () => {
    axios
      .put(
        `http://localhost:5000/api/`.concat("publication/rate"),
        {
          publicId: _id,
          userId,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        const { flag, publication } = res.data;
        console.log(flag, publication);
        const likeDiv = document.getElementById(`${_id}`)!;
        publication.likedUsers.includes(userId)
          ? (likeDiv.style.color = "#000 ")
          : (likeDiv.style.color = "#ff1919 ");
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
    const minutes =
      date.getMinutes() < 10
        ? `0${date.getMinutes()}`
        : date.getMinutes().toString();
    return `${date.getHours()}:${minutes} ${date.toDateString()}`;
  };

  const handleShow = () => {
    setShowComments(true);
  };

  const handleClose = () => {
    setShowComments(false);
  };

  return (
    <div className="publication">
      <div className="publication-main">
        <div className="publication-header d-flex ">
          <div className="publication-avatar col-1"></div>
          <div className="publication-name col-4">
            <h4>{nickname}</h4>
          </div>
          <div className="publication-data w-50 d-flex">
            <p>{dateFormatter(new Date(date))}</p>
          </div>
        </div>
        <div className="publication-main">
          <div className="publication-body">
            <p>{value}</p>
          </div>
          <div className="publication-bottom">
            <div className="publication-evaluation d-flex ">
              <div className="publication-comments d-flex" onClick={handleShow}>
                <div className="comments">
                  <FontAwesomeIcon icon={faComment} />
                </div>
                <p>{coms.length}</p>
              </div>

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
              <ModalWindow
                nickname={nickname}
                date={dateFormatter(new Date(date))}
                value={value}
                _id={_id}
                setComs={setComs}
                coms={coms}
                handleClose={handleClose}
                open={showComments}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publication;
