import axios from 'axios';
// import _ from 'lodash';
import jwtDecode from 'jwt-decode';
const url = 'localhost:5000/api';
const tokenKey = 'privateUserToken';

// const getToken = () => {
//     return localStorage.getItem(tokenKey);
// }
// const config = {
//     headers: {
//         'Content-Type': 'application/json',
//         'x-auth-token': getToken()
//     }
// }
// api calling func to register a user 
const registerUser = (user) => {
    return axios.post(`${url}/users`, user); 
}
const getCurrentUser = () => {
    try {
        const user = jwtDecode(localStorage.getItem(tokenKey));
        return user;
    }
    catch (ex) {
        return null;
    }
}
const logout = () => {
    localStorage.removeItem(tokenKey);
}

export default {
    registerUser,
    tokenKey,
    getCurrentUser,
    logout

}

