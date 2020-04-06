import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import dataServices from '../../services/dataServices';
import UiCard from './../common/UiCard';
import UiModal from './../common/UiModal';

import Typography from '@material-ui/core/Typography';
import  Grid from '@material-ui/core/Grid';
import  Container from '@material-ui/core/Container';
import  Button from '@material-ui/core/Button';

import communityillus from '../../illustrations/ques.svg';
import  Hidden  from '@material-ui/core/Hidden';

const style = {
    backgroundColor: '#ff6987',
    color: 'white'
}

const ReadQuestion = (props) => {
    const ques = props.location.state;
    const { user } = props;
    const [question, setQuestion] = useState(ques);
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        async function fetchQuestion() {
            try {
                // const title = props.match.params.title;
                // const { data } = await dataServices.fetchOne('questions', title);

                const { data } = await dataServices.fetchOne('questions', question._id);
                setQuestion(data);
                // console.log(title);

            }
            catch (e) {
                toast.error(e.message);
            }

        }
        fetchQuestion();

    }, [])
    const handleChange = ({ currentTarget: input }) => {
        const ans = input.value;
        setAnswer(ans);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (answer === '')
            return toast.error('Answer cannot be empty!');
        let ques = { ...question };
        let ans = {
            ansUserId: props.user._id,
            answer: answer
        }

        try {
            ques.answers.unshift(ans);
           // setQuestion(ques);

            const { data } = await dataServices.postData({ resource: 'questions', parameter: ques._id, data: ans });
           setQuestion(data);

            toast.success('Answer added');
        }
        catch (e) {
            setQuestion(ques);
            toast.error("Something went wrong");
        }




    }
   
    return (
        <Container maxWidth='lg'>
          
            <br />
            <br />
             <Grid container spacing={4}>
            <Grid item xs={12} lg={6}>
            <Button variant="outlined"  onClick={() => window.history.back()}>Back</Button>
            <br/>
            <br/>
            <Typography gutterBottom variant="h4">
              {question.question}?
                </Typography>
            
            <Typography gutterBottom variant="subtitle1">
                {question.author}
                </Typography>
            <Typography gutterBottom variant="subtitle1">
                {question.answers.length} Answers
                </Typography>
            <br />
            <br />
            <UiModal
                style={style}
                heading='Your answer means a lot to the community'
                button2='Submit'
                inputLabel='Your answer'
                inputName='answer'
                value={answer}
                onChange={handleChange}
                onSubmit={handleSubmit}
                user={user}/>
            <br />

           
            {
                question.answers.map(ans => (
                    <>
                        
                            <Grid item xs={12} lg={6}>
                                <UiCard
                                data={ans}
                                property='answer'
                                content={ans.author}
                               /> 
                                
                            </Grid>
                            <br/>
                            <br/>
                    </>
                ))
            }
          
                </Grid>
                
                      <Hidden mdDown>
            <Grid item lg={6}>
                <img src={communityillus} alt='answer'/>
                </Grid>
                </Hidden>
                    </Grid>
                
        </Container>
    )
}

export default ReadQuestion
