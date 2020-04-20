import axios from 'axios';

const url = 'http://localhost:5000/api';
// const url = 'https://eddy-app.herokuapp.com/api';
// const url = 'http://api.tremollo.co:5000/api';
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
const fetchAll = resource => {
 
        return axios.get(`${url}/${resource}`, config);
}
    

const fetchOne = (resource, parameter ='', useConfig = true) => {
    const c = useConfig ? config : null;
    return axios.get(`${url}/${resource}/${parameter}`, config);
}

const postData = ({ resource, parameter = '', data }) => {
    return axios.post(`${url}/${resource}/${parameter}`, data, config);   
}

const putData = ({ resource, parameter = '', data }) => {
    return axios.put(`${url}/${resource}/${parameter}`, data, config); 
}
export default {
    fetchAll,
    fetchOne,
    postData,
    putData
}