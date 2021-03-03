import React from "react";
import { Modal, Backdrop, Fade } from "@material-ui/core";

import Comment from "../comment/comment";
import AddComment from "../addComment/addComment";

import "./modalWindow.scss";

interface IModalWindow {
  handleClose: VoidFunction;
  open: boolean;
  _id: number;
  setComs: React.Dispatch<React.SetStateAction<string[]>>;
  coms: string[];
  date: string;
  nickname: string;
  value: string;
}

const ModalWindow: React.FC<IModalWindow> = ({
  open,
  handleClose,
  _id,
  setComs,
  coms,
  date,
  nickname,
  value,
}) => {
  return (
    <Modal
      className="Modal d-flex"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className="paper">
          <div className="publication-modal">
            <div className="publication-header d-flex justify-content-between">
              <div className="col-5 d-flex">
                <div className="publication-avatar"></div>
                <div className="publication-name">
                  <h4>{nickname}</h4>
                </div>
              </div>
              <div className="publication-data d-flex">
                <p>{date}</p>
              </div>
            </div>
            <div className="publication-body">
              <p>{value}</p>
            </div>
          </div>
          <div className="publication-comments">
            <div>
              <AddComment publicId={_id.toString()} updateComments={setComs} />
            </div>
            <div className="d-flex flex-column-reverse">
              {coms.map((comment, index) => (
                <div
                  key={`${comment}`}
                  className={`${index === 0 ? "modal-comment-last" : ""}`}
                >
                  <Comment commentId={comment} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalWindow;
