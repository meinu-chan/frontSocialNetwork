import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";

import "./friendsList.scss";
import { setFriends } from "../../../../redux/actions/friends";
import FriendsListModal from "./components/friendListModal/friendListModal";
import { IFriend } from "../../../../Interfaces/BasicInterfaces";

interface RootState {
  friends: [IFriend];
}

interface IFriendsList {
  friends: any[];
}
const FriendsList: React.FC<IFriendsList> = ({ friends }) => {
  const [showFriends, setShowFriends] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    friends && dispatch(setFriends(friends));
  }, [dispatch, friends]);

  const friendsState = useSelector(({ friends }: RootState) => friends);

  const handleToFriendPage = (id: string) => {
    document.location.href = `${process.env.REACT_APP_CLIENT_URL}id=${id}`;
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
        <div className="friends-header" onClick={() => setShowFriends(true)}>
          <h4>Friends: {friendsState.length}</h4>
        </div>
        <div className="list-friends d-flex">
          {(friendsState.length > 0 &&
            friendsState.map((friend, index) => {
              return (
                <div
                  key={`${friend.friendId}_${index}`}
                  className="list-friends-friend d-flex w-100"
                >
                  <div
                    className="friend d-flex"
                    onClick={() => handleToFriendPage(friend.friendId)}
                  >
                    <div className="friend-image"> </div>

                    <div className="friend-nickname">
                      <h5>{friend.friendNickname}</h5>
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
