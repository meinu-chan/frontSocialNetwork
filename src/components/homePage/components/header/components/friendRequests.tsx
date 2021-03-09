import React from "react";
import { Menu, MenuItem } from "@material-ui/core/";
import axios from "axios";

const ITEM_HEIGHT = 48;

interface IFriendRequest {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  waitForRes: [string];
}

export default function FriendRequest({
  anchorEl,
  open,
  handleClose,
  waitForRes,
}: IFriendRequest) {
  const [users, setUsers] = React.useState<any>([]);

  React.useEffect(() => {
    waitForRes.forEach((id) =>
      axios
        .get(`http://localhost:5000/api/`.concat(`page/find/id=${id}`), {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          const { user } = res.data;
          setUsers((prev: any) => [...prev, user]);
        })
    );
  }, []);

  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "20ch",
        },
      }}
    >
      <p>Friend Requests </p>
      {users.map((user: any, index: number) => {
        return (
          user && (
            <MenuItem
              key={`${user._id}_${index}`}
              selected={user._id === "Pyxis"}
              onClick={handleClose}
            >
              {user.nickname}
            </MenuItem>
          )
        );
      })}
    </Menu>
  );
}
