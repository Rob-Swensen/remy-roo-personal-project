import customerReducer from "./customerReducer";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  customer: customerReducer
});

export default createStore(rootReducer);
