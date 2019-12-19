import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import dataServices from '../../services/dataServices';
import { slug } from '../../utils/urlSlug';
import { Link } from 'react-router-dom';

const Dashboard = ({user}) => {
  
    const [topics, setTopic] = useState([]);

   
    useEffect(() => {
        async function fetchTopics(resource) {
            try {
                const { data } = await dataServices.fetchAll(resource);
                setTopic(data);
            }
            catch (ex) {
                return toast.error(ex.message);
            }

        }
        fetchTopics('learning');

    }, []);
    return (
    <>
            <h1>Dashboard</h1>
            <h2>Practice</h2>
            {
                topics.map(topic => (
                    <>
                        <Link to={{ 
                            pathname: `/practice/${slug(topic.title)}`,
                            state: topic

                         }}>{topic.title}</Link>  
                    </>
                ))
                
            }

    </>
  )
}

export default Dashboard
