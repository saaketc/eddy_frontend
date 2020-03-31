import React from 'react'

import ReadQuiz from './quiz/readQuiz';


const ReadActivity = (props) => {

  const { activity, topic } = props.match.params;
  const  quiz  = props.location.state;

  // function to return component of activity dynamically
  const componentToReturn = () => {
    if (activity === 'quiz')
      return <ReadQuiz quiz={quiz} />;
    // else if (activityType === 'psychometry-test')
    //   return <RPsychometry activity={activityType} />;
  }

  return (
    <>
     { componentToReturn() }
    </>
  )
}

export default ReadActivity
