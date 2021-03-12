import React from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";

import "./friendsList.scss";
import { setFriends } from "../../../../redux/actions/friends";
import FriendsListModal from "./components/friendListModal/friendListModal";

interface RootState {
  friends: [User];
}

interface User {
  nickname: string;
  publications: [];
  _id: string;
  friends: [User];
}
const FriendsList: React.FC = () => {
  const [showFriends, setShowFriends] = React.useState<boolean>(false);

  const dispatch = useDispatch();
  React.useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/".concat(
          `page/friends/${window.location.href.split("/").pop()}`
        )
      )
      .then((res) => {
        dispatch(setFriends(...res.data.friends));
      });
  }, [dispatch]);

  const friendsState = useSelector(({ friends }: RootState) => friends);

  const handleToFriendPage = (id: string) => {
    document.location.href = `http://localhost:3000/id=${id}`;
  };

  return (
    <>
      <FriendsListModal
        open={showFriends}
        handleClose={() => {
          setShowFriends(false);
        }}
        handleToFriendPage={handleToFriendPage}
        friends={friendsState}
      />
      <div className="user-friends">
        <div className="friends-header">
          <h4>Friends: {friendsState.length}</h4>
        </div>
        <div className="list-friends d-flex">
          {(friendsState.length > 0 &&
            friendsState.map((friend, index) => {
              return (
                <div key={`${friend._id}_${index}`} className="d-flex w-100">
                  <div
                    className="friend d-flex"
                    onClick={() => handleToFriendPage(friend._id)}
                  >
                    <div className="friend-image"> </div>

                    <div className="friend-nickname">
                      <h5>{friend.nickname}</h5>
                    </div>
                  </div>
                </div>
              );
            })) || (
            <div className="friend-list-empty d-flex">
              Friend's list is empty.
            </div>
          )}
        </div>
        {friendsState.length > 0 && (
          <div
            className="friends-bottom col-md-12"
            onClick={() => setShowFriends(true)}
          >
            <div className="friends-bottom-dots">
              <FontAwesomeIcon icon={faCircle} className="friends-bottom-dot" />
              <FontAwesomeIcon icon={faCircle} className="friends-bottom-dot" />
              <FontAwesomeIcon icon={faCircle} className="friends-bottom-dot" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FriendsList;
