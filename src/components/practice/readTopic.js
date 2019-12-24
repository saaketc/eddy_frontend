import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';


import { slug } from './../../utils/urlSlug';
import dataServices from '../../services/dataServices';
import  Container  from '@material-ui/core/Container';
import  Grid  from '@material-ui/core/Grid';
import UiCard from './../common/UiCard';

const ReadTopic = (props) => {
     const topicFromLink = props.location.state;
   
    const [topic, setTopic] = useState(topicFromLink);

    useEffect(() => {
        async function fetchTopic() {
            const topicTitle = props.match.params.topic;
            //const topicFromLink = props.location.state;
            const { data } = await dataServices.fetchOne('learning', topicTitle);
            console.log(data);
            setTopic(data);
            
        }   
        fetchTopic();
    }, [])
    {/* <Link to={{ 
                            pathname: `/practice/${slug(topic.title)}/${slug(chapter.title)}`,
                            state: chapter
                        }}><h3>{chapter.title}</h3>
                        </Link>
                           */}
    
    const handleClick = (chapter) => {
        return props.history.push(`/practice/${slug(topic.title)}/${slug(chapter.title)}`, chapter);
    }
    return (
        <Container>
            <br />
            <br />
            <Grid container spacing={6}>
            {/* <h1>{topic.title}</h1> */}
            {
                
                topic.chapters.map(chapter => (
                    <Grid item lg={4}>
                        <UiCard
                            data={chapter}
                            property='title'
                            onClick={handleClick}
                           
                        />
                    </Grid>

                ))
                }
       </Grid>         
    </Container>
  )
}

export default withRouter(ReadTopic);
