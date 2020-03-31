import React from 'react'

import Quiz from './quiz/quiz';
import Psychometry from './psychometry/psychometry';

const Activity = (props) => {
  
  const { user } = props;
  const activityType = props.match.params.activity;

 // function to return component of activity dynamically
  const componentToReturn = () => {
    if (activityType === 'quiz')
      return <Quiz activity={activityType}/>;
    else if (activityType === 'psychometry-test')
      return <Psychometry activity={activityType}/>;
  }
  
  return (
    <>
    {componentToReturn()}
      </>
    )
  }
  
  export default Activity
