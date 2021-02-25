import React, { SetStateAction } from "react";
import { Button } from "@material-ui/core";

import "./addComment.scss";
import axios from "axios";

interface IAddComment {
  publicId: string;
  updateComments: React.Dispatch<SetStateAction<string[]>>;
}

const AddComment: React.FC<IAddComment> = ({ publicId, updateComments }) => {
  const refTextarea = React.useRef<any>();

  const addComment = () => {
    axios
      .put(
        `http://localhost:5000/api/`.concat("comment/addComment"),
        {
          publicId,
          value: refTextarea.current.value,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        refTextarea.current.value = "";
        updateComments((prev) => [...prev, res.data.comment._id]);
      })
      .catch((err) => {
        if (err.response) {
          err.response.status === 401
            ? (document.location.href = "/")
            : console.log(err.response);
        }
      });
  };

  return (
    <div className="addComment d-flex">
      <div className="addComment-textarea">
        <textarea
          ref={refTextarea}
          placeholder="Set comment..."
          className="addComment-textarea"
        ></textarea>
      </div>
      <div className="addComment-bottom">
        <Button variant="contained" color="primary" onClick={addComment}>
          Comment
        </Button>
      </div>
    </div>
  );
};

export default AddComment;
