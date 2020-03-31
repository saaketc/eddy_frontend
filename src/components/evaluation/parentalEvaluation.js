import React from 'react'
import uuid from 'react-uuid'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { arrSum } from '../../utils/generalFunc';
import { toast } from 'react-toastify';
import { Typography, Grid } from '@material-ui/core';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import DissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import GreatIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import CheckBox from './../common/checkBox';
import dataService from '../../services/dataServices';
import feedbackillus from '../../illustrations/feedback.svg';
const color = '#ff6987';

const useStyles = makeStyles(theme => ({
    outline: {
        border: `1px solid ${color}`,
        color: 'white',
        backgroundColor: color
    },
    btn: {
        color: color,
        border: `1px solid ${color}`
    },
    emoji: {
        color: color
    },
    bold:{
        fontWeight:'500'
    },
     heading:{
     fontWeight:'500',
     color: color
  }
}))
const ParentalEvaluation = (props) => {
    const classes = useStyles();

    // const criticalQuestions = ['Less satisfactory', 'Satisfactory', 'Great'];

    const { evaluation, maxParentalScore, moduleId, courseId, enrolledCourses } = props;
    const { observational, questions } = evaluation;

    const [boxId, setBoxId] = React.useState('');
    const [score, setScore] = React.useState([]);
    const [criticalQuestions, setCriticalQuestions] = React.useState([]);
    // const [enrolled, setEnrolled] = React.useState(enrolledCourses);
    const [feedbackSubmitted, setfeedbackSubmitted] = React.useState(false);
    const [feedback, setFeedback] = React.useState([]);

    React.useEffect(() => {
        // let courseObj = enrolled.find(course => course.courseId === courseId);
        // if (courseObj.score > 0) {
        //     setfeedbackSubmitted(true);
        // }

        const newObservational = [];
        for (let i of observational) {
            let obj = {};
            obj.tag = i;
            obj.selected = false;
            newObservational.push(obj);
        }
        setFeedback(newObservational);
    }, [])
    const handleOption = (option) => {
        setBoxId(option._id);
        const weightages = [...score, option.weight];
        setScore(weightages);
    }
    const handleObservation = () => {

    }
    const handleQuestion = () => {

    }
    const handleChange = ({ currentTarget }, option, indexOfQues, indexOfOption) => {
        let weightage = [...score];
        let weight = 0;
        let checked = currentTarget.checked;
        let arr = [...criticalQuestions];
        arr[indexOfQues].options[indexOfOption].selected = checked;
        console.log(indexOfQues, indexOfOption);
        setCriticalQuestions(arr);
        weight = checked ? option.weight : 0;
        weightage.push(weight);
        setScore(weightage);


    }
    const handleFeedbackChange = ({currentTarget}, index) => {
        let weightage = [...score];
        let weight = 0;
        const checked = currentTarget.checked;
        const arr = [...feedback];
        arr[index].selected = checked;
        setFeedback(arr);
        weight = checked ? 1 : 0;
        weightage.push(weight);
        setScore(weightage);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
       // clear fields
        let arr = [...feedback];
        for (let q of arr) {
            q.selected = false
        }
        setFeedback(arr);

        // to send score
        try {
            let toPost = {
                resource: 'course/parental',
                parameter: courseId,
                data: {
                    moduleId: moduleId,
                    parentalScore: arrSum(score) / maxParentalScore
                }
            }
            const { data } = await dataService.postData(toPost);
            // setEnrolled(data.enrolledCourses);
            setfeedbackSubmitted(true);
            toast.success('Feedback scores successfully submitted');
        }

        catch (e) {
            toast.error('Something went wrong');
            console.log(e.message);

        }

    }
    
    return (
        <Container>
              <Grid container spacing={4}>
             <Grid item xs={12} sm={12} md={5} lg={5}>  
             <img src={feedbackillus} alt='feedback' />
              </Grid>

               <Grid item xs={12} sm={12} md={7} lg={7}>
            <Typography variant='h4' className={classes.heading}>
                Parental observational feedback
                </Typography>
            <br/>
            <Typography variant='h5'>
                Select the appropriate options during your kid's activity
                </Typography>
            <form onSubmit={handleSubmit}>
                <List>
                    {
                        feedback.map((observation, index) => (
                            <>
                                <ListItem key={observation._id}>
                                    <CheckBox
                                        label={observation.tag}
                                        checked={observation.selected}
                                        onChange={(event)=>handleFeedbackChange(event, index)}/>
                                </ListItem>
                            
                            </>
                        ))
                    }
                </List>
                {/* <Typography variant='h5'>
                    Ask and rate these questions from your kid's response
                </Typography>
                <List>
                    
                    {
                        criticalQuestions.map((ques, indexOfQues) => (
                            <>
                                <ListItem key={indexOfQues}>
                                    <ListItemIcon><EmojiEmotionsIcon className={classes.emoji} /></ListItemIcon>
                                    <Typography variant='h6'>
                                        {ques.question}
                                    </Typography>
                                </ListItem>
                                {ques.options.map((option, indexOfOption) => (
                                    <ListItem key={option.id}
                                        
                                    >
                                       
                                        <CheckBox
                                            label={option.tag}
                                            checked={option.selected}
                                            onChange={(event)=> handleChange(event, option, indexOfQues, indexOfOption)}/>
                                       
                                    </ListItem>
                            ))
                               
                    }
                            </>
                        ))
                    }
                </List> */}
                <Button
                    type='submit'
                    variant='outlined'
                    className={classes.btn}
                    disabled={feedbackSubmitted}>
                {!feedbackSubmitted ? 'Submit' : 'Submission successful'}
                </Button>
            </form>
            </Grid>
            </Grid>
        </Container>
    )
}

export default ParentalEvaluation
