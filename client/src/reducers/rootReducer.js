import {
    combineReducers
} from 'redux';
import authentication from './authentication';
import userReducer from './userReducer';

export default combineReducers({
    userReducer: userReducer,
    authentication: authentication
});