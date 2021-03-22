import React from "react";
import { Modal, Backdrop, Fade } from "@material-ui/core";

import "./friendListModal.scss";
import { IFriend } from "../../../../../../Interfaces/BasicInterfaces";

interface IModalWindow {
  handleClose(): void;
  open: boolean;
  friends: [IFriend];
  handleToFriendPage(id: string): void;
}

const FriendListModal: React.FC<IModalWindow> = ({
  open,
  handleClose,
  friends,
  handleToFriendPage,
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
          <ul className="d-flex row">
            {friends &&
              friends.map((friend) => {
                return (
                  <li
                    className="modal-window-friend col-3 d-flex"
                    key={`${friend.friendId}`}
                    onClick={() => handleToFriendPage(friend.friendId)}
                  >
                    <div className="modal-window-main d-flex">
                      <div className="modal-window-friend-avatar"></div>
                      <div className="modal-window-friend-nickname">
                        {friend.friendNickname}
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
