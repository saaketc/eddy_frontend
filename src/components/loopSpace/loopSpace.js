import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';

import UiCard from '../common/UiCard';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { slug } from './../../utils/urlSlug';


const LoopSpace = (props) => {

  // const [activities, setActivities] = useState([]);
  const activities = [
    {type: 'Quiz', content: 'Practice quizzes to deepen your understanding.'},
    { type: 'Psychometry Test', content: 'Understand your psychology of dealing with situations.'},
    { type: 'Case Study', content: 'Apply your problem solving skills to analyze and solve real business problems.'}
  ]

  const handleClick = (activity) => {
    return props.history.push(`/loopSpace/${slug(activity.type)}`);
   
  }

  return (
    <Container>

      <br />
      <br />
      <Typography gutterBottom variant="h4">
       Broaden your horizon with LoopSpace playground
                </Typography>
      <br />
    
        <Grid container spacing={6}>
          {
            activities.map(activity => (



              <Grid item lg={4}>
                <UiCard
              
                  data={activity}
                  property='type'
                  content={activity.content}
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

export default withRouter(LoopSpace)