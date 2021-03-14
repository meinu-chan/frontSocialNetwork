import React from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

import "./createPublication.scss";

interface ICreatePublication {
  getPublications: VoidFunction;
}

const CreatePublication: React.FC<ICreatePublication> = ({
  getPublications,
}) => {
  const textareaRef = React.useRef<any>();

  const areaFocus = () => {
    textareaRef.current && textareaRef.current.focus();
  };

  let textareaHeight: string | null = null;

  if (textareaRef.current) {
    textareaHeight = textareaRef.current.style.height;
    textareaRef.current.addEventListener("keyup", () => {
      if (textareaRef.current.scrollTop > 0) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    });
  }

  const addPublication = async () => {
    textareaRef.current &&
      (await axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}`.concat("publication"),
          {
            value: textareaRef.current.value,
          },
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          textareaRef.current.value = "";
          textareaRef.current.style.height = textareaHeight;
        })
        .catch((err) => {
          if (err.response) {
            err.response.status === 401
              ? (document.location.href = "/")
              : console.log(err.response);
          }
        }));

    getPublications();
  };

  return (
    <div className="create-publication d-flex align-items-center">
      <div className="create-publication-header">
        <h4>Set new publication</h4>
      </div>
      <div
        className="create-publication-empty-field d-flex"
        onClick={areaFocus}
      >
        <div className="create-publication-textarea d-flex flex-column">
          <textarea
            ref={textareaRef}
            className="create-publication-textarea"
            placeholder="Tell world about your day..."
            maxLength={500}
          ></textarea>
        </div>
        <div className="create-publication-bottom d-flex flex-column align-items-end">
          <Button
            className="create-publication-button"
            variant="outlined"
            onClick={addPublication}
          >
            Public
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePublication;
