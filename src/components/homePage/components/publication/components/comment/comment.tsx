import React from "react";
import axios from "axios";
import Linkify from "react-linkify";

import "./comment.scss";

interface IComment {
  commentId: string;
}

interface ICommentData {
  _id: string;
  nickname: string;
  date: string;
  value: string;
  userId: string;
}

const Comment: React.FC<IComment> = ({ commentId }) => {
  const [commentData, setCommentData] = React.useState<ICommentData>({
    _id: "",
    nickname: "",
    date: "",
    value: "",
    userId: "",
  });

  React.useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}`.concat("comment/getComment"),
        {
          commentId,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        const { _id, nickname, date, value, userId } = res.data;
        setCommentData({
          _id,
          nickname,
          date: dateFormatter(new Date(date)),
          value,
          userId,
        });
      })
      .catch((err) => {
        if (err.response) {
          err.response.status === 401
            ? (document.location.href = "/")
            : console.log(err.response);
        }
      });
  }, [commentId]);

  const dateFormatter = (date: Date) => {
    const minutes =
      date.getMinutes() < 10
        ? `0${date.getMinutes()}`
        : date.getMinutes().toString();
    return `${date.getHours()}:${minutes} ${date.toDateString()}`;
  };

  const goToCommentAuthor = () => {
    document.location.href = `${process.env.REACT_APP_CLIENT_URL}`.concat(
      `id=${commentData.userId}`
    );
  };

  return (
    <div className="comment d-flex">
      <div className="comment-header d-flex justify-content-between">
        <div className="col-5 d-flex align-items-center comment-user-avatar-name">
          <div
            className="comment-user-avatar"
            onClick={goToCommentAuthor}
          ></div>
          <div className="comment-user-name" onClick={goToCommentAuthor}>
            {commentData.nickname}
          </div>
        </div>
        <div className="d-flex w-100 comment-date-main">
          <div className="comment-date">{commentData.date}</div>
        </div>
      </div>
      <div className="comment-body">
        <Linkify>{commentData.value} </Linkify>
      </div>
    </div>
  );
};

export default Comment;
