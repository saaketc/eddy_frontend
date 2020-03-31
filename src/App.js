import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import Welcome from './components/welcome';
import CoursePage from './components/course/CoursePage';
import ModulePage from './components/course/ModulePage';
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Community from './components/community/community';
import userService from './services/userService';
import Dashboard from './components/dashboard/dashboard';
import Profile from './components/dashboard/profile';
import ReadQuestion from './components/community/read';
import Navbar from './components/navbar/navbar';
import dataServices from './services/dataServices';
import { slug } from './utils/urlSlug';

const App = (props) => {

  const [user, setUser] = useState({});
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {


    setUser(userService.getCurrentUser())
    
  }, [])
  const handleAuthClick = (tag) => {
    if (tag === 'signup')
      return props.history.push('/auth/signup');
    if (tag === 'login')
      return props.history.push('/auth/login');

  }
  const handleGeneralClick = (tag) => {
  if (tag === 'community')
    return props.history.push('/community');
    if (tag === 'practice')
      return props.history.push('/');
    if (tag === 'loopSpace')
      return props.history.push('/LoopSpace');
  }
  // for searching in community
  const handleSearchChange = async ({ currentTarget:input }) => {
    setQuery(input.value.toLowerCase());
    if (query !== '') {
      const { data: results } = await dataServices.fetchOne('search', query, false);
      setSearchResults(results);
      
    }
    else 
      setSearchResults([]);
  }

  // to click search results
  const onClickSearchItem = (item) => {
     props.history.push(`/community/${slug(item.question)}`, item);
    setSearchResults([]);
  }

  return (
    <>
      <ToastContainer />
      < Navbar
        onAuthClick={handleAuthClick}
        onGeneralClick={handleGeneralClick}
        user={user}
        value={query}
        onChange={handleSearchChange}
        searchResults={searchResults}
        onClickSearchItem={onClickSearchItem}
        />
     
      <Switch>
          <Route path='/modules/:title' render={props => <ModulePage {...props} user={user} />}/>
          <Route path='/courses/:title' component={CoursePage} />
          <Route path='/profile' render={props => <Profile {...props} user={user} />}/>
          <Route path='/auth/signup' component={Signup} />
          <Route path='/auth/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/community/:title' render={props => <ReadQuestion {...props} user={user} />}/>
          <Route path='/community' render={props => <Community {...props} user={user} />} />
          <Route exact path='/' render={props => user ? <Dashboard {...props} user={user} /> : <Welcome/>} />
        </Switch>
     
    </>

  );
}

export default withRouter(App)
