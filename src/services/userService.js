import axios from 'axios';
// import _ from 'lodash';
import jwtDecode from 'jwt-decode';
// const url = 'http://localhost:5000/api';
// const url = 'https://eddy-app.herokuapp.com/api';
const url = 'http://api.tremollo.co:5000/api';

const tokenKey = 'privateUserToken';

const getToken = () => {
    return localStorage.getItem(tokenKey);
}
const config = {
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getToken()
    }
}
// api calling func to register a user 
const registerUser = (user) => {

    return axios.post(`${url}/users`, user);
     

}
// to login a user
const loginUser =  (credential) => {
    return axios.post(`${url}/auth`, credential);
    
    
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

const saveNotes = (chapterId, note) => {
    return axios.post(`${url}/notes/${chapterId}`, note, config);
}
export default {
    registerUser,
    tokenKey,
    getCurrentUser,
    logout,
    loginUser,
    saveNotes

}

