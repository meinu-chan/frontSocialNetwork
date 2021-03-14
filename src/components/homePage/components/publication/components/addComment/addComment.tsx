import React, { SetStateAction } from "react";
import { Button } from "@material-ui/core";

import "./addComment.scss";
import axios from "axios";

interface IAddComment {
  publicId: string;
  updateComments: React.Dispatch<SetStateAction<string[]>>;
}

const AddComment: React.FC<IAddComment> = ({ publicId, updateComments }) => {
  const textareaRef = React.useRef<any>();

  let textareaHeight: string | null = null;

  if (textareaRef.current) {
    textareaHeight = textareaRef.current.style.height;
    textareaRef.current.addEventListener("keyup", () => {
      if (textareaRef.current.scrollTop > 0) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    });
  }

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
          textareaRef.current.style.height = textareaHeight;
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
        <textarea
          ref={textareaRef}
          placeholder="Set comment..."
          className="addComment-textarea"
          maxLength={500}
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
