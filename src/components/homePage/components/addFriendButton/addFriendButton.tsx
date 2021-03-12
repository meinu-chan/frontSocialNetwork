import React from "react";

import { Button } from "@material-ui/core";

interface IAddFriendButton {
  sendFriendRequest: () => void;
  follow: boolean;
  friends: any;
}

export default function AddFriendButton({
  sendFriendRequest,
  friends,
  follow,
}: IAddFriendButton) {
  return (
    <div>
      {friends && (
        <Button
          variant="outlined"
          onClick={sendFriendRequest}
          disabled={friends.includes(sessionStorage.getItem("userId"))}
        >
          {follow ? "Sended..." : "Send Friend Request"}
        </Button>
      )}
    </div>
  );
}
