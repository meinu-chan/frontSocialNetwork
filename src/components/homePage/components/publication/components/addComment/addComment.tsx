import React, { SetStateAction } from "react";
import { Button } from "@material-ui/core";
import TextareaAutosize from "react-textarea-autosize";

import "./addComment.scss";
import axios from "axios";

interface IAddComment {
  publicId: string;
  updateComments: React.Dispatch<SetStateAction<string[]>>;
}

const AddComment: React.FC<IAddComment> = ({ publicId, updateComments }) => {
  const textareaRef = React.useRef<any>();

  const addComment = () => {
    const value = textareaRef.current.value.trim();
    if (value.length !== 0) {
      axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}`.concat("comment/addComment"),
          {
            publicId,
            value: textareaRef.current.value,
          },
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          textareaRef.current.value = "";
          updateComments((prev) => [...prev, res.data.comment._id]);
        })
        .catch((err) => {
          if (err.response) {
            err.response.status === 401
              ? (document.location.href = "/")
              : console.log(err.response);
          }
        });
    }
  };

  const areaFocus = () => {
    textareaRef.current && textareaRef.current.focus();
  };

  return (
    <div className="addComment d-flex" onClick={areaFocus}>
      <div className="addComment-textarea">
        <TextareaAutosize
          ref={textareaRef}
          placeholder="Set comment..."
          className="addComment-textarea"
          maxLength={1000}
        />
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
