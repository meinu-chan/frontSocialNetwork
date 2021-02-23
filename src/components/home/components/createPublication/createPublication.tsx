import React from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

import "./createPublication.scss";

const CreatePublication: React.FC = () => {
  const [text, setText] = React.useState<string>("");

  const textSetter = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const addPublication = async () => {
    await axios
      .put(
        `http://localhost:5000/api/`.concat("page/publication"),
        {
          value: text,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => console.log(res));

    setText("");
    // document.getElementById("create-publication-textarea")!. = "";
  };

  return (
    <div className="create-publication d-flex">
      <div className="create-publication-header">
        <h4>Set new publication</h4>
      </div>
      <div className="create-publication-textarea d-flex flex-column">
        <textarea
          id="create-publication-textarea"
          placeholder="Tell world about your day..."
          cols={50}
          rows={5}
          maxLength={500}
          value={text}
          onChange={textSetter}
        ></textarea>
      </div>
      <div className="create-publication-bottom d-flex flex-column align-items-end">
        <Button variant="contained" color="primary" onClick={addPublication}>
          Public
        </Button>
      </div>
    </div>
  );
};

export default CreatePublication;
