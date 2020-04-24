import customerReducer from "./customerReducer";
import cartReducer from "./cartReducer";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  customer: customerReducer,
  cartCount: cartReducer,
});

export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
