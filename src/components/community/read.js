import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import dataServices from '../../services/dataServices';
import UiCard from './../common/UiCard';
import UiModal from './../common/UiModal';

import Typography from '@material-ui/core/Typography';
import  Grid from '@material-ui/core/Grid';
import  Container from '@material-ui/core/Container';

const style = {
    backgroundColor: '#047b63',
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
                const { data } = await dataServices.fetchOne('questions', question._id);
                setQuestion(data);

            }
            catch (e) {
                toast.error('Something went wrong');
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
    {/* <form onSubmit={handleSubmit}>
                <textarea type="text"
                    placeholder="Your answer here..."
                    name='answer'
                    value={answer}
                    onChange={handleChange} >
                </textarea><br />
                <button>Answer</button>
            </form> */}

    return (
        <Container>
            <br />
            <br />
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
                onSubmit={handleSubmit} />
            <br />

           
            {
                question.answers.map(ans => (
                    <>
                        <Grid container spacing={6}>
                            <Grid item lg={4}>
                                <UiCard
                                data={ans}
                                property='answer'
                                content={ans.author}
                               /> 
                                </Grid>
                            </Grid>
                    </>
                ))
            }

        </Container>
    )
}

export default ReadQuestion
