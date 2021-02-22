import React from "react";
import { Button } from "@material-ui/core";

import "./createPublication.scss";

const CreatePublication: React.FC = () => {
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
        ></textarea>
      </div>
      <div className="create-publication-bottom d-flex flex-column align-items-end">
        <Button variant="contained" color="primary">
          Publicate
        </Button>
      </div>
    </div>
  );
};

export default CreatePublication;
