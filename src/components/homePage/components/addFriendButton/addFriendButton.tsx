import React from "react";

import { Button } from "@material-ui/core";
import { IFriend } from "../../../../Interfaces/BasicInterfaces";

interface IAddFriendButton {
  sendFriendRequest: () => void;
  deleteFriend: () => void;
  follow: boolean;
  friends: any;
}

export default function AddFriendButton({
  sendFriendRequest,
  friends,
  follow,
  deleteFriend,
}: IAddFriendButton) {
  const [alreadyFriend, setAlreadyFriend] = React.useState<boolean>(() => {
    let found = false;
    friends?.forEach((friend: IFriend) => {
      if (friend.friendId === sessionStorage.getItem("userId")) {
        found = true;
      }
    });
    return found;
  });

  return (
    <div>
      {friends && (
        <Button
          variant="outlined"
          onClick={
            alreadyFriend
              ? () => {
                  deleteFriend();
                  setAlreadyFriend(false);
                }
              : sendFriendRequest
          }
        >
          {follow ? "Sended..." : alreadyFriend ? "Delete" : "Add"}
        </Button>
      )}
    </div>
  );
}
