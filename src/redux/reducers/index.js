import { combineReducers } from "redux";
import getTokenReducer from "./getToken";

const rootReducer = combineReducers({
    getToken: getTokenReducer,
    //another reducers
})

export default rootReducer;