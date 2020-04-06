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
import communityillus from '../../illustrations/community.svg';
// import communityillus_small from '../../illustrations/community_small.svg';
import  Hidden  from '@material-ui/core/Hidden';

const color = '#ff6987';
const style = {
    backgroundColor: '#ff6987',
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
            if (userQuestion === '' || userQuestion === ' ')
                return toast.error('Question cannot be empty!');
            const QuesData = {
               question: removeQuesMark(userQuestion),
                // question: userQuestion,
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

    return (
        <Container>
            <br/>
            <br />
            <Grid container spacing={4}>
                <Grid xs={12} lg={6}>
             <Hidden mdDown>
              <Typography gutterBottom variant="h3">
                    {user ? 'Ask the community about anything related to kids!' : 'Join the community!'}
                </Typography>
                </Hidden>

                 <Hidden only='lg'>
              <Typography gutterBottom variant="h4">
                    {user ? 'Ask the community about anything related to kids!' : 'Join the community!'}
                </Typography>
                </Hidden>
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
            {loading ? <Grid alignItems='center' justify='center'><Loader type='spin' height='20%' width='20%' color='#ff6987'/></Grid> : (
                <>
                    {

                        questions.map(ques => (
                            <>
                                <Grid item xs={12} lg={6} key={ques._id}>
                                    <UiCard
                                        data={ques}
                                        property='question'
                                        content={ques.author}
                                        onClick={handleQuesClick} />
                                </Grid>
                                <br/>
                                <br/>
                            </>
                        ))

                    }
                    
                    </>
            )}
            </Grid>
              <Grid xs={12} lg={6}>

                       <Hidden mdDown>
                             <img src={communityillus} alt='ask community'/>
                           </Hidden>
                           
            </Grid>
         </Grid>  
    </Container>
  )

  
}

export default withRouter(Community)
