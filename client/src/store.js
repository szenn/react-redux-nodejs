import {
  createStore,
  applyMiddleware,
  compose
} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import jwt from 'jsonwebtoken';

const jwtToken = localStorage.getItem("JWT_TOKEN");

const decodedToken = jwt.decode(jwtToken);



const initialState = {
  userReducer: {
    user: decodedToken ? true : false
  },
  authentication: {
    token: jwtToken,
    isAuthenticated: jwtToken ? true : false
  }
};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);




export default store;