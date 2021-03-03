import React from "react";
import axios from "axios";

import "./comment.scss";

interface IComment {
  commentId: string;
}

interface ICommentData {
  _id: string;
  nickname: string;
  date: string;
  value: string;
}

const Comment: React.FC<IComment> = ({ commentId }) => {
  const [commentData, setCommentData] = React.useState<ICommentData>({
    _id: "",
    nickname: "",
    date: "",
    value: "",
  });

  const dateFormatter = (date: Date) => {
    const minutes =
      date.getMinutes() < 10
        ? `0${date.getMinutes()}`
        : date.getMinutes().toString();
    return `${date.getHours()}:${minutes} ${date.toDateString()}`;
  };

  React.useEffect(() => {
    axios
      .post(
        `http://localhost:5000/api/`.concat("comment/getComment"),
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
        const { _id, nickname, date, value } = res.data;
        setCommentData({
          _id,
          nickname,
          date: dateFormatter(new Date(date)),
          value,
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

  return (
    <div className="comment d-flex">
      <div className="comment-header d-flex justify-content-between">
        <div className="col-5 d-flex align-items-center">
          <div className="comment-user-avatar"></div>
          <div className="comment-user-name">{commentData.nickname}</div>
        </div>
        <div className="d-flex w-100 comment-date-main">
          <div className="comment-date">{commentData.date}</div>
        </div>
      </div>
      <div className="comment-body">{commentData.value}</div>
    </div>
  );
};

export default Comment;
