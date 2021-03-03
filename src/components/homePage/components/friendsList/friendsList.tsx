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
        dispatch(setFriends(res.data.friends));
      });
  }, [dispatch]);

  const friendsState = useSelector(({ friends }: RootState) => friends);

  const friendsCountChecker = (): number | null => {
    const len = friendsState.length;

    switch (len as number) {
      case 0:
        return null;
      case 1:
        return 12;
      case 2:
        return 6;
      case 3:
        return 4;
      default:
        return 3;
    }
  };

  const columnsCount = friendsCountChecker();

  const handleToFriendPage = (id: string) => {
    document.location.href = `http://localhost:3000/user/id=${id}`;
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
        <div className="list-friends">
          <ul>
            {(columnsCount &&
              friendsState.map((friend, index) => {
                if (index < 4) {
                  return (
                    <li
                      key={`${friend._id}`}
                      className={`col-${columnsCount} d-flex justify-content-center`}
                    >
                      <div
                        className="friend d-flex"
                        onClick={() => handleToFriendPage(friend._id)}
                      >
                        <div className="friend-image"> </div>

                        <div className="friend-nickname">
                          <h5>{friend.nickname}</h5>
                        </div>
                      </div>
                    </li>
                  );
                }
                return <div key={`${index}_${friend._id}`}></div>;
              })) || (
              <li className="friend-list-empty">Friend list is empty.</li>
            )}
          </ul>
        </div>
        {columnsCount && friendsState.length > 4 && (
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
