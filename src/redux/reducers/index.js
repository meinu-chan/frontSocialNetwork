import { combineReducers } from "redux";
import userReducer from "./user";

const rootReducer = combineReducers({
    user: userReducer
    //another reducers
})

export default rootReducer;