import { combineReducers } from "redux";
import friendsReducer from "./friends";
import userReducer from "./user";

const rootReducer = combineReducers({
    user: userReducer,
    friends: friendsReducer,
    //another reducers
})

export default rootReducer;