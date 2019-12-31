import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import service from '../../services/userService';
import { toast } from 'react-toastify';
import AuthForm from './authForm';
import { slug } from './../../utils/urlSlug';


const Signup = (props) => {

    const [user, setUser] = useState({});
    const question = props.history.location.state;
  

    const handleChange = ({ currentTarget: input }) => {
        const newUser = { ...user };
        newUser[input.name] = input.value;
        setUser(newUser);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await service.registerUser(user);
            localStorage.setItem(service.tokenKey, response.headers['x-auth-token']);
            // window.location = question ? `/community/${slug(question.question)}` : '/';
            question ? props.history.push(`/community/${slug(question.question)}`, question) : window.location = '/'

        }
        catch (ex) {
             toast.error(ex.message);
            
           
        
        }
        
    }
    return (
        <>
            {/* <form onSubmit={handleSubmit}>

                <input type="text" value={user.firstName} placeholder="firstName" onChange={handleChange} name="firstName" required />
                <input type="text" value={user.lastName} placeholder="lastName" onChange={handleChange} name="lastName" required />
                <input type="email" value={user.email} placeholder="email" onChange={handleChange} name="email" required />
                <input type="password" value={user.password} placeholder="password" onChange={handleChange} name="password" required />
                <button type="submit">Signup</button>
            </form> */}
            <AuthForm
                onSubmit={handleSubmit}
                onChange={handleChange}
                data={user}
                heading='Signup'
                pass={true}
                signup={true}
                label='Signup'
                
                />
        </>
    )
}

export default withRouter(Signup)