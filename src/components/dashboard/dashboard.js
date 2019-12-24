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

const Dashboard = (props) => {
  
    const { user, history } = props;
    const [topics, setTopic] = useState([]);
    const handleClick = (topic) => {
        return history.push(`/practice/${slug(topic.title)}`, topic);
        //return history.push(`/practice/${topic.title}`, topic);
    }
   
    useEffect(() => {
        async function fetchTopics(resource) {
            try {
                const { data } = await dataServices.fetchAll(resource);
                setTopic(data);
            }
            catch (ex) {
                return toast.error(ex.message);
            }

        }
        fetchTopics('learning');

    }, []);
    return (
    <Container>
            {/* <Typography variant='h2'>
                Learn
         </Typography> */}
            <br />
            <br />
            <Typography gutterBottom variant="h2">
                Applied soft skills
                </Typography>
            <br/>
            <Grid container spacing={6}>
            {
                topics.map(topic => (
                  
                        
                           
                            <Grid item lg={4}>
                                    <UiCard
                                    image={problem_solving}
                                    data={topic}
                                    property='title'
                                    content='This is some test content.'
                                    mediaHeight={true}
                                    onClick={handleClick}
                                    buttonLabel1='Go learn'
                                    />
                                </Grid>
                   
                       
                    

                    
                ))
            
        }
            </Grid>
   </Container>
  )
}

export default withRouter(Dashboard)
