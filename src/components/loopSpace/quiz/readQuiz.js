import React, {useState} from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid  from '@material-ui/core/Grid';
import  CheckBox  from '../../common/checkBox';
import { toast } from 'react-toastify';

// Checkbox single select issue resolve


const ReadQuiz = (props) => {

        const { quiz } = props;
        const { content } = quiz;
        // const [boxColor, setBoxColor] = useState('')
        const [score, setScore] = useState(0);
        // to handle the click of the checkbox and match with correct answer
        const handleCheckboxClick = (answer, option) => {
                if (answer === option) {
                        toast.success('Yay ! Correct answer, Got a point'); 
                        setScore(score + 5);
                }
                      
                else {
                        toast.error('Oops ! Wrong answer');
                        setScore(score - 5);
                }
                       
                        
        }
        return (
                <Container>
                       
                        <br />
                        <br />
                        <Typography gutterBottom variant="h6">
                                Your Score: {score}
                        </Typography>
                        <br />
                        <br/>
                        <Grid container spacing={6}>
                                
                                <Typography gutterBottom variant="h4">
                                        {quiz.topic}
                                </Typography>  
                               
                                <br />
                                <br />
                                {
                                        content.map(c => (
                                                <Grid item lg={12}>
                                                        <Typography gutterBottom variant="h5">
                                                                {c.question}
                                                                
                                                        </Typography>
                                                        {
                                                                
                                                               c.options.map(option => (
                                                                       <p>  <CheckBox
                                                                               label={option}
                                                                              
                                                                               onClick={()=>handleCheckboxClick(c.answer, option)}/></p>
                                                                        ))
                                                                        
                                                                
                                                          }
                                                </Grid>
                                        ))
                                }
                        </Grid>
                </Container>
        )
}

export default ReadQuiz
