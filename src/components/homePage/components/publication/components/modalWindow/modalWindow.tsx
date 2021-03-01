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
            <div className="publication-header d-flex ">
              <div className="publication-avatar col-1"></div>
              <div className="publication-name col-4">
                <h4>{nickname}</h4>
              </div>
              <div className="publication-data  w-50 d-flex">
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
            <ul className="d-flex flex-column-reverse">
              {coms.map((comment, index) => (
                <div key={`${index}_${comment}`}>
                  <Comment commentId={comment} />
                </div>
              ))}
            </ul>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalWindow;
