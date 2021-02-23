import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

import "./publication.scss";

interface IPublication {
  nickname: string;
}

const Publication: React.FC<IPublication> = ({ nickname }) => {
  return (
    <div className="publication">
      <div className="publication-header d-flex ">
        <div className="publication-avatar"></div>
        <div className="publication-name">
          <h4>{nickname}</h4>
        </div>
        <div className="w-50"></div>
        <div className="publication-data">
          <p>9:58 23.02.2021</p>
        </div>
      </div>
      <div className="publication-body">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          ipsa quo et obcaecati inventore, doloribus ratione, amet commodi sit
          tempore corrupti delectus officiis, labore neque perspiciatis atque
          quas omnis perferendis!
        </p>
      </div>
      <div className="publication-bottom">
        <div className="publication-evaluation d-flex">
          <div className="publication-likes d-flex">
            <div className="like">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <p>12000</p>
          </div>
          <div className="publication-dislikes d-flex">
            <div className="dislike">
              <FontAwesomeIcon icon={faHeartBroken} />
            </div>
            <p>100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publication;
