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
import welcomeillus1 from '../../illustrations/fatherhood.svg';
import welcomeillus2 from '../../illustrations/superhero.svg';
import welcomeillus1_small from '../../illustrations/fatherhood_small.svg';
import welcomeillus2_small from '../../illustrations/superhero_small.svg';
import { makeStyles } from '@material-ui/core/styles';
import  Hidden  from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
    heading:{
        fontWeight: '500'
    }
}))
const color = '#ff6987';

const Dashboard = (props) => {
  
    const imageURL = 'http://localhost:5000/courseImages/';
    // const imageURL = 'https://eddy-app.herokuapp.com/courseImages/';
    // const imageURL = 'http://api.tremollo.co:5000/courseImages/';
    const { user, history } = props;
    // const [courses, setCourses] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const classes = useStyles();
    const handleClick = (activity) => {
        return history.push(`/activities/${slug(activity.title)}`, activity);
        
        
    }
   
    useEffect(() => {
        async function fetchActivities(resource) {
            try {
                const { data } = await dataServices.fetchAll(resource);
                setActivities(data);
                setLoading(false);
            }
            catch (ex) {
                return toast.error("Something went wrong!");
            }

        }
        fetchActivities('activity');

    }, []);
    return (
    <Container>
         
            <br />
            <br />
            <Typography gutterBottom variant="h3" className={classes.heading}>
                {`Welcome ${user.firstName},`}
                </Typography>
                <br/>
                <Typography gutterBottom variant="h4">
                Pick these awesome activities and make your kid stand out in the crowd!
                </Typography>
            <br />
            <Grid container spacing={6}>
           <Hidden mdDown>
               <Grid item lg={6}>
                    <img src={welcomeillus1} alt="welcome" />
                </Grid>
                <Grid item lg={6}>
                    <img src={welcomeillus2} alt="happy" />
                </Grid>
               </Hidden>
               <Hidden only='lg'>
                  
                   <Grid item lg={6}>
                    <img src={welcomeillus1_small} alt="welcome" />
                </Grid>
                <Grid item lg={6}>
                    <img src={welcomeillus2_small} alt="happy" />
                </Grid> </Hidden>
            </Grid>
            <br/>
            <br/>
             <Typography gutterBottom variant="h3" className={classes.heading}>
                Curated activities for your kid
                </Typography>
                <br/>
                <br/>
            {loading ? <Grid alignItems='center' justify='center' ><Loader type='spin' height='20%' width='20%' color='#ff6987' /></Grid> : (
                
                <Grid container spacing={6}>
                    {
                        activities.map(activity => (
                  
                        
                           
                            <Grid item lg={4}>
                                <UiCard
                                    image={imageURL + activity.image}
                                    data={activity}
                                    property='title'
                                    content={activity.description}
                                    color={color }
                                   // mediaHeight={true}
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
