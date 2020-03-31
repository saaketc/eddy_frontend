import React, { useState, useEffect } from 'react';
import AuthForm from './authForm';

import userService from '../../services/userService';
import { toast } from 'react-toastify';


const Login = (props) => {
    const [credential, setCredential] = useState({});
    
    const handleChange = ({currentTarget: input}) => {
        let inputCred = { ...credential };
        inputCred[input.name] = input.value;
        setCredential(inputCred);
    }
    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const { data: token } = await userService.loginUser(credential);
            localStorage.setItem(userService.tokenKey, token);
            window.location = '/';
        }
        catch (e) {
            toast.error(e.message);
            
        }
    }
    return (
    <>
            <AuthForm
                onSubmit={handleSubmit}
                onChange={handleChange}
                data={credential}
                signup={false}
                label='Login'
                heading='Login'
                pass={true}/>
        </>
    )
   
}
export default Login
