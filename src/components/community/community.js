import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loading';
import dataServices  from '../../services/dataServices';
import { slug, removeQuesMark } from '../../utils/urlSlug';
import UiCard from './../common/UiCard';
import  Container  from '@material-ui/core/Container';
import  Grid from '@material-ui/core/Grid';
import  Typography from '@material-ui/core/Typography';
import UiModal from './../common/UiModal';

const color = '#047b63';
const style = {
    backgroundColor: '#047b63',
    color: 'white'
}
const Community = (props) => {
    const { user, history } = props;
    const [questions, setQuestion] = useState([]);
    const [userQuestion, setUserQuestion] = useState('');
    const [loading, setLoading] = useState(true);
    // const [author, setAuthor] = useState('');

    useEffect(() => {
        async function fetchQuestions(resource) {
            try {
                const { data } = await dataServices.fetchAll(resource);
                setQuestion(data);
                setLoading(false);
            }
            catch (ex) {
                return toast.error(ex.message);
            }

        }
        fetchQuestions('questions');

    }, []);

   // click a ques
    const handleQuesClick = (question) => {
        if (!user) {
            return history.push('/auth/signup', question);
        }
        return history.push(`/community/${slug(question.question)}`, question);
    }
   // handle change of ask question
    const handleChange = ({currentTarget: input}) => {
        const userQues = input.value;
        setUserQuestion(userQues);
    }
   // submitting ques
    const handleSubmit = async (e) => {
        e.preventDefault();
        let oldQuestions = [...questions];
        try {

            const QuesData = {
               // question: removeQuesMark(userQuestion),
                question: slug(userQuestion),
                userId: user._id,
                answers:[]
            }
            // const newQuestions = [...questions];
            // newQuestions.unshift(QuesData);
           
            const { data } = await dataServices.postData({ resource: 'questions', data: QuesData });
           const newQuestions = [...questions];
            newQuestions.unshift(data);
            // setAuthor(data.author);
            setQuestion(newQuestions);

            toast.success('Question added');
            setUserQuestion('');
        }
        catch (e) {
            setQuestion(oldQuestions);
            toast.error(e.message);
            
        }
   }
    {/* <h2 key={ques._id}>{`${ques.question}?`}</h2>
                        <small>Answers {ques.answers.length}</small>
                        <br/>
                        {ques.answers.length > 0 ? <Link to={{ 
                            pathname: `/community/${slug(ques.question)}`,
                            state: ques
                        }}>
                        Read
                        </Link> : null}   <button>Answer</button>
                    */}
    return (
        <Container>
            <br/>
            <br />
            {loading ? <Grid alignItems='center' justify='center'><Loader type='spin' height='20%' width='20%' color='#047b63'/></Grid> : (
                <>
                <Typography gutterBottom variant="h2">
                    {user ? 'Ask community' : 'Login to ask the community!'}
                </Typography>
                <div>
                    <UiModal
                            style={style}
                            heading='Ask the community'
                            button2='Submit'
                            inputLabel='Your question'
                            inputName='question'
                            value={userQuestion}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            user={user}/>
                    <br />
                    <br />
                </div>
                <Grid container spacing={6}>
                    {

                        questions.map(ques => (
                            <>
                                <Grid item lg={4} key={ques._id}>
                                    <UiCard
                                        data={ques}
                                        property='question'
                                        content={ques.author}
                                        onClick={handleQuesClick} />
                                </Grid>
                            </>
                        ))

                    }
                    </Grid>
                    </>
            )}
           
    </Container>
  )

  
}

export default withRouter(Community)
