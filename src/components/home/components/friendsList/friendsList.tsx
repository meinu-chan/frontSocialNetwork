import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import "./friendsList.scss";

const FriendsList: React.FC = () => {
  return (
    <div className="user-friends">
      <div className="friends-header">
        <h3>Friends: 23</h3>
      </div>
      <div className="list-friends">
        <ul className="d-flex">
          <li>
            <div className="friend d-flex">
              <div className="friend-image"> </div>

              <div className="friend-nickname">
                <h5>nickname1</h5>
              </div>
            </div>
          </li>
          <li>
            <div className="friend d-flex">
              <div className="friend-image"> </div>

              <div className="friend-nickname">
                <h5>nickname2</h5>
              </div>
            </div>
          </li>
          <li>
            <div className="friend d-flex">
              <div className="friend-image"> </div>

              <div className="friend-nickname">
                <h5>nickname3</h5>
              </div>
            </div>
          </li>
          <li>
            <div className="friend d-flex">
              <div className="friend-image"> </div>

              <div className="friend-nickname">
                <h5>nickname4</h5>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="friends-bottom col-md-12">
        <FontAwesomeIcon icon={faCircle} className="friends-bottom-dots" />
        <FontAwesomeIcon icon={faCircle} className="friends-bottom-dots" />
        <FontAwesomeIcon icon={faCircle} className="friends-bottom-dots" />
      </div>
    </div>
  );
};

export default FriendsList;
