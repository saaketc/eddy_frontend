import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import UiCard from '../common/UiCard';

import dataServices from '../../services/dataServices';
import { slug } from '../../utils/urlSlug';
import { Link, withRouter } from 'react-router-dom';
import problem_solving from '../../illustrations/problem_solving.svg';
import  Typography  from '@material-ui/core/Typography';
import  Grid  from '@material-ui/core/Grid';
import  Container  from '@material-ui/core/Container';
import  Loader  from 'react-loading';
import C1 from '../../illustrations/course1.svg';

const Dashboard = (props) => {
  
    const imageURL = 'http://localhost:5000/courseImages/';
    const { user, history } = props;
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleClick = (course) => {
        return history.push(`/courses/${slug(course.title)}`, course);
        
        
    }
   
    useEffect(() => {
        async function fetchcourses(resource) {
            try {
                const { data } = await dataServices.fetchAll(resource);
                setCourses(data);
                setLoading(false);
            }
            catch (ex) {
                return toast.error(ex.message);
            }

        }
        fetchcourses('course');

    }, [courses]);
    return (
    <Container>
         
            <br />
            <br />
            <Typography gutterBottom variant="h3">
              Pick courses for your kid
                </Typography>
            <br />
            {loading ? <Grid alignItems='center' justify='center' ><Loader type='spin' height='20%' width='20%' color='#ff6987' /></Grid> : (
                
                <Grid container spacing={6}>
                    {
                        courses.map(course => (
                  
                        
                           
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
            )}
   </Container>
  )
}

export default withRouter(Dashboard)
