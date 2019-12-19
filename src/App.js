import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Welcome from './components/welcome';
import Signup from './components/auth/signup';
import Logout from './components/auth/logout';
import Community from './components/community/community';


import userService from './services/userService';
import Dashboard from './components/dashboard/dashboard';
import ReadQuestion from './components/community/read';
import ReadTopic from './components/practice/readTopic';
import ReadChapter from './components/practice/readChapter';
import Navbar from './components/navbar/navbar';

const App = (props) => {

  const [user, setUser] = useState({});
  
  useEffect(() => {


    setUser(userService.getCurrentUser())
    
  }, [])
  const handleSignupClick = () => {
    return props.history.push('/auth/signup');
  }
  const handleGeneralClick = (tag) => {
  if (tag === 'community')
     return props.history.push('/community');
  }
  return (
    <>
      <ToastContainer />
      < Navbar
        onSignupClick={handleSignupClick}
        onGeneralClick={handleGeneralClick}
        user={user}/>
     
        <Switch>
          <Route path='/auth/signup' component={Signup} />
          <Route path='/logout' component={Logout} />
          <Route path='/practice/:topic/:title' render={props => <ReadChapter {...props} user={user} />}/>
          <Route path='/practice/:topic' render={props => <ReadTopic {...props} user={user} />}/>
          <Route path='/community/:title' render={props => <ReadQuestion {...props} user={user} />}/>
          <Route path='/community' render={props => <Community {...props} user={user} />} />
          <Route exact path='/' render={props => user ? <Dashboard {...props} user={user} /> : <Welcome/>} />
        </Switch>
     
    </>

  );
}

export default withRouter(App)
