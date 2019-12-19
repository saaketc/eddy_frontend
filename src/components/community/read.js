import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import dataServices from '../../services/dataServices';

const ReadQuestion = (props) => {
    const ques = props.location.state;

    const [question, setQuestion] = useState(ques);
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        async function fetchQuestion() {
            try {
                const { data } = await dataServices.fetchOne('questions', ques._id);
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
            setQuestion(ques);

            const { data } = await dataServices.postData('questions', ques._id, ans);
            //setQuestion(data);
            toast.success('Answer added');
        }
        catch (e) {
            setQuestion(ques);
            toast.error("Something went wrong");
        }




    }
    return (
        <>
            <h1>{question.question}</h1>

            <small>Answers {question.answers.length}</small>
            <br />

            <form onSubmit={handleSubmit}>
                <textarea type="text"
                    placeholder="Your answer here..."
                    name='answer'
                    value={answer}
                    onChange={handleChange} >
                </textarea><br />
                <button>Answer</button>
            </form>
            {
                question.answers.map(ans => (
                    <>
                        <p key={ans._id}>{ans.answer}</p>

                    </>
                ))
            }

        </>
    )
}

export default ReadQuestion
