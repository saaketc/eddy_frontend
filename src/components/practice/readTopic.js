import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


import { slug } from './../../utils/urlSlug';
import dataServices from '../../services/dataServices';

const ReadTopic = (props) => {
    const topicFromLink = props.location.state;
   
    const [topic, setTopic] = useState(topicFromLink);

    useEffect(() => {
        async function fetchTopic() {
           // const topicTitle = props.match.params.topic
            //const topicFromLink = props.location.state;
            const { data } = await dataServices.fetchOne('learning', topicFromLink.title);
            setTopic(data);
            console.log(data)
        }   
        fetchTopic();
    }, [])

    return (
    <>
            <h1>{topic.title}</h1>
            {
                topic.chapters.map(chapter => (
                    <>
                        
                        <Link to={{ 
                            pathname: `/practice/${slug(topic.title)}/${slug(chapter.title)}`,
                            state: chapter
                         }}><h3>{chapter.title}</h3></Link>
                          
                            
                    </>
                ))
            }
    </>
  )
}

export default ReadTopic
