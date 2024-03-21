import { combineReducers } from "redux";
import { usersName } from "../userConfig";
import { userReducer } from "../Users/UserSlice";

export const rootReducer = combineReducers({
  [usersName]: userReducer,
});
