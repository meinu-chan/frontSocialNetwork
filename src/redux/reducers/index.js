import { combineReducers } from "redux";
import friendsReducer from "./friends";
import listOfReqReducer from "./listOfReq";
import userReducer from "./user";

const rootReducer = combineReducers({
    user: userReducer,
    friends: friendsReducer,
    showList: listOfReqReducer,
    //another reducers
})

export default rootReducer;