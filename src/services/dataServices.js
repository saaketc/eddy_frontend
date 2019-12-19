import axios from 'axios';

const url = 'http://localhost:5000/api';

const fetchAll = resource => {
 
        return axios.get(`${url}/${resource}`);
}
    

const fetchOne = (resource, parameter) => {
    return axios.get(`${url}/${resource}/${parameter}`);
}

const postData = (resource, parameter, data) => {
    return axios.post(`${url}/${resource}/${parameter}`, data)    
}

export default {
    fetchAll,
    fetchOne,
    postData
}