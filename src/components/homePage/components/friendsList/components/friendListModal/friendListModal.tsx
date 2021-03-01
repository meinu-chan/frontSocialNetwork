import React from "react";
import { Modal, Backdrop, Fade } from "@material-ui/core";

import "./friendListModal.scss";

interface IModalWindow {
  handleClose(): void;
  open: boolean;
  friends: [User];
  handleToFriendPage(id: string): void;
}

interface User {
  nickname: string;
  publications: [];
  _id: string;
  friends: [User];
}

const FriendListModal: React.FC<IModalWindow> = ({
  open,
  handleClose,
  friends,
  handleToFriendPage,
}) => {
  console.log(friends);
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
          <ul>
            {friends &&
              friends.map((friend, index) => {
                return (
                  <li
                    className="modal-window-friend col-3 d-flex"
                    key={`${friend._id})_${index}`}
                    onClick={() => handleToFriendPage(friend._id)}
                  >
                    <div className="modal-window-main d-flex">
                      <div className="modal-window-friend-avatar"></div>
                      <div className="modal-window-friend-nickname">
                        {friend.nickname}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </Fade>
    </Modal>
  );
};
export default FriendListModal;
