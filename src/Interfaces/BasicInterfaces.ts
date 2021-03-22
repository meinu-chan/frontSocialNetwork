export interface IFriend {
  friendNickname: string;
  friendId: string;
}

export interface IWaiting {
  waiterId: String;
  waiterNickname: String;
}

export interface IPublication {
  _id: number;
  nickname: string;
  date: Date;
  value: string;
  likedUsers: Array<String>;
  comments: Array<string>;
  getAllPublications: () => void;
}
