import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import dataServices from '../../../services/dataServices';
import { toast } from 'react-toastify';
import UiCard from '../../common/UiCard';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { slug } from '../../../utils/urlSlug';


const Quiz = (props) => {

    const [quizzes, setQuizzes] = useState([]);
    const { history, activity } = props;
    useEffect(() => {
        async function getQuiz() {
            try {
                const { data } = await dataServices.fetchAll('loopSpace/quiz');
                // console.log(data);
                setQuizzes(data);
            }
            catch (e) {
                toast.error('Something went wrong.');
            }
        }
        getQuiz();
    }, [])

    // handle click
    const handleClick = (quiz) => {
        history.push(`/loopSpace/${activity}/${slug(quiz.topic)}`, quiz);
    }
    return (
        <Container>
           
            <Grid container spacing={6}>
               
                {quizzes.map(quiz => (

                    <Grid item lg={4}>
                        <br />
                        <br />
                        <UiCard

                            data={quiz}
                            property='topic'
                            onClick={handleClick}
                            buttonLabel1='Go learn'
                        />
                    </Grid>
                ))}

            </Grid>
        </Container>
    )
}

export default withRouter(Quiz)
