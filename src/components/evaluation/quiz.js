import React from 'react'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { arrSum } from '../../utils/generalFunc';
import { toast } from 'react-toastify';
import { Typography, Grid } from '@material-ui/core';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import CheckBox from './../common/checkBox';
import dataService from '../../services/dataServices';
import quizillus from '../../illustrations/quiz.svg';
import quizillus_small from '../../illustrations/quiz_small.svg';
import  Hidden  from '@material-ui/core/Hidden';

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
        color:color
    },
    heading:{
     fontWeight:'500',
     color: color
  }
}))
const Quiz = (props) => {
    const classes = useStyles();

    const { courseId, quiz, maxQuizScore, enrolledCourses } = props;

    const [boxId, setBoxId] = React.useState('');
    const [score, setScore] = React.useState([]);
    const [quizNew, setQuiz] = React.useState([]);
    // const [enrolled, setEnrolled] = React.useState(enrolledCourses);
    const [quizSubmitted, setQuizSubmitted] = React.useState(false);

    React.useEffect(() => {
        let newQuiz = [...quiz]
        for (let q of newQuiz) {
            for (let o of q.options) {
                o.selected = false;
         }
        }   
        setQuiz(newQuiz);
        // let courseObj = enrolled.find(course => course.courseId === courseId);
        // if (courseObj.score > 0) {
        //     setQuizSubmitted(true);
        // }
    }, []) 
   
    const handleOptionChange = ({ currentTarget }, option) => {
        let weightage = [...score];
        let weight = 0;
        let checked = currentTarget.checked;
        let arr = [...quizNew];
        for (let q of arr) {
            for (let o of q.options) {
                if (o._id === option._id) {
                    o.selected = checked;
                    break;
                }
                  
            }
        }
        setQuiz(arr);
        weight = checked ? option.weight : 0;
        weightage.push(weight);
        setScore(weightage);
        
       
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setScore([]);
        // to clear selected field
        let ques = [...quizNew]
        for (let q of ques) {
            for (let o of q.options) {
                o.selected = false;
            }
        }
        setQuiz(ques);
        try {
            let toPost = {
                resource: 'course/quiz', 
                parameter: courseId,
                data: {
                    quizScore: arrSum(score) / maxQuizScore
                }
           } 
            const { data } = await dataService.postData(toPost);
            toast.success('Scores successfully submitted');
            // setEnrolled(data.enrolledCourses);
            setQuizSubmitted(true);
        }

        catch (e) {
            toast.error('Something went wrong');
            console.log(e.message);
        
        }

    }
    return (
        <Container>
           <Grid container spacing={4}>
             <Grid item xs={12} sm={12} md={6} lg={6}>  
            <Hidden mdDown>
                 <img src={quizillus} alt='quiz' />
                </Hidden>
                <Hidden only='lg'>
                    <Typography variant='h4' className={classes.heading}>
                Quiz for a better understanding
                </Typography>
                <br/>
                 <img src={quizillus_small} alt='quiz' />
                </Hidden>
              </Grid>

               <Grid item xs={12} sm={12} md={6} lg={6}>
            <Hidden mdDown>
                <Typography variant='h4' className={classes.heading}>
                Quiz for a better understanding
                </Typography>
                </Hidden>
            <form onSubmit={handleSubmit}>
            <List>
                {
                        quizNew.map((q, index) => (
                        <>
                            <ListItem key={q._id}>
                                <ListItemIcon><EmojiEmotionsIcon className={classes.emoji}/></ListItemIcon>
                                <Typography variant='h5'>
                                {q.question}    
                                </Typography>
                        </ListItem>
                          {  
                            q.options.map((option, index) => (
                                <ListItem key={option._id}
                                    
                                    className={boxId === option._id ? classes.outline : ''}>
                                    <ListItemIcon>{index + 1}</ListItemIcon>
                                    <CheckBox
                                        label={option.value}
                                        checked={option.selected}
                                        onChange={(event) => handleOptionChange(event, option)} />
                                </ListItem>
                            ))
                           }
                          </>      
                    ))
                }
                </List>
                <Button
                    type='submit'
                    variant='outlined'
                    className={classes.btn}
                    disabled={quizSubmitted}>
                {!quizSubmitted ? 'Submit' : 'Submission successful'}
                </Button>
                </form>
                </Grid>
             </Grid>
    </Container>
  )
}

export default Quiz
