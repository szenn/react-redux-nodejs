import axios from 'axios';



import {
    SIGN_UP,
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP_ERROR,
    SIGN_IN_ERROR

} from './types';

import {
    history
} from './history';


export const registerUser = data => dispatch => {

    axios.post('/api/users/signup', data)
        .then(res =>

            dispatch({
                type: SIGN_UP,
                payload: res.data.token
            })
        ).then((res) => {
            history.push("/homepage");
            localStorage.setItem('JWT_TOKEN', res.payload);
            axios.defaults.headers.common['Authorization'] = res.payload;
        })
        .catch((err) => {

            dispatch({
                type: SIGN_UP_ERROR,
                payload: 'Email is already in use'
            })
        });

};
export const loginUser = data => dispatch => {
    axios.post('/api/users/signin', data)
        .then(res =>
            dispatch({
                type: SIGN_IN,
                payload: res.data.token

            })

        ).then(res => {
            history.push("/homepage");
            localStorage.setItem('JWT_TOKEN', res.payload);
            axios.defaults.headers.common['Authorization'] = res.payload;
            //redirect user to protected route

        }).catch(err => {

            dispatch({
                type: SIGN_IN_ERROR,
                payload: err.response.data.error
            })
        });
}
export const logOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');
        axios.defaults.headers.common['Authorization'] = '';

        dispatch({
            type: SIGN_OUT,
            payload: ''
        })
    };
}