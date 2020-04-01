import React, { useState, useEffect } from 'react'
import AuthForm from '../auth/authForm';
import service from '../../services/userService';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { slug } from './../../utils/urlSlug';
import dataService from '../../services/dataServices';
import userService from '../../services/userService';
import {Container, Grid, Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UiCard from '../common/UiCard';
import  Loader  from 'react-loading';

const color = '#ff6987';
const useStyles = makeStyles(theme => ({
   btn: {
    color: color,
    border: `1px solid ${color}`,
    fontSize:'15px'
   }
}));
const Profile = (props) => {
    // const imageURL = 'http://localhost:5000/courseImages/';
    // const imageURL = 'https://eddy-app.herokuapp.com/courseImages/';
    const imageURL = 'http://api.tremollo.co:5000/courseImages/';


    const classes = useStyles();

    const { user, history } = props;

    const [loading, setLoading] = useState(true);
    const [updatedUser, setUpdatedUser] = useState(user);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
   
    useEffect(() => {
        async function fetchUser(){
          try{
            const { data } = await dataService.fetchOne('users/profile');
            setUpdatedUser(data.user);
            setEnrolledCourses(data.enrolled);
            setLoading(false);
          }
          catch(e){
              console.log('Could not get profile!');
              
          }
        }
             fetchUser();
        
       
    }, [])
  
    const handleClick = (course) => {
        return history.push(`/courses/${slug(course.title)}`, course);
      }
   
    const handleChange = ({ currentTarget: input }) => {
        const newUser = { ...updatedUser };
        newUser[input.name] = input.value;
        setUpdatedUser(newUser);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const toPost = {
                resource: 'users/updateProfile',
                data: updatedUser
            }
            const { data, headers } = await dataService.putData(toPost);
            toast.success('Profile successfully updated');
            // userService.logout();
            // localStorage.setItem(userService.tokenKey, headers['x-auth-token']);
           
            setUpdatedUser(data);
        }
        catch (ex) {
             toast.error(ex.message);
        }
        
    }
    return (
        
           <Container> 
            {loading ? 
            <Grid alignItems='center' justify='center' >
            <Loader type='spin' height='20%' width='20%' color='#ff6987' /></Grid>
            :  
            (  
            <> 
            <AuthForm
                onSubmit={handleSubmit}
                onChange={handleChange}
                data={updatedUser}
                heading='Update Profile'
                profile={true}
                noLabel={true}
                label='Update'
                
                />
                <br/>
            {enrolledCourses.length > 0 ?
             <Typography variant="h4"  align='center'>
                {`Enrolled courses for your kid, ${updatedUser.firstName}`}
                        </Typography> 
                :
                <>
                 <Typography variant="h4"  align='center'>
                        {`Hey ${updatedUser.firstName}, your enrolled courses will live here`}
                        </Typography> 
                        <br/>
                         <Typography align='center'>
                        <Button variant='outlined' 
                        className={classes.btn}
                        onClick={()=> history.push('/')}>Suggested courses</Button>
                        </Typography> 

                        </>
                        }
          
                        <br/>
          <Grid container spacing={6}>
              
                    {
                        enrolledCourses.map(course => (
                  
                        
                           
                            <Grid item lg={4}>
                                <UiCard
                                    image={imageURL + course.image}
                                    data={course}
                                    property='title'
                                    content={course.description}
                                    mediaHeight={true}
                                    onClick={handleClick}
                                    buttonLabel1='Go learn'
                                />
                            </Grid>
                   
                       
                    

                    
                        ))
            
                    }
                </Grid>
                </>
            )
            }
        </Container>
    )
}

export default withRouter(Profile)