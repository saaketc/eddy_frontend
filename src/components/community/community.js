import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import dataServices  from '../../services/dataServices';
import { slug } from '../../utils/urlSlug';

const Community = () => {
    const [questions, setQuestion] = useState([]);
    useEffect(() => {
        async function fetchQuestions(resource) {
            try {
                const { data } = await dataServices.fetchAll(resource);
                setQuestion(data);
            }
            catch (ex) {
                return toast.error(ex.message);
            }

        }
        fetchQuestions('questions');

    }, []);
   
    return (
    <>
            <h1>Community</h1>
            {
                questions.map(ques => (
                    <>
                        <h2 key={ques._id}>{`${ques.question}?`}</h2>
                        <small>Answers {ques.answers.length}</small>
                        <br/>
                        {ques.answers.length > 0 ? <Link to={{ 
                            pathname: `/community/${slug(ques.question)}`,
                            state: ques
                        }}>
                        Read
                        </Link> : null}   <button>Answer</button>
                   
                    </>
                ))
            }
    </>
  )

  
}

export default Community
