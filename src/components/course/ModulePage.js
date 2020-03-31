import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Button } from '@material-ui/core';
import BackButton from '../common/backButton';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ForumIcon from '@material-ui/icons/Forum';
import BrushIcon from '@material-ui/icons/Brush';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Activity from './activity';
import Quiz from '../evaluation/quiz';
import ParentalEvaluation from './../evaluation/parentalEvaluation';


const drawerWidth = 240;
const color = '#ff6987';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
     
    },
    backgroundColor: color
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ModulePage(props) {
  const history = useHistory();

  const { container, location } = props;
  const { mod, courseId } = location.state;
  const { activityContent, evaluation, quiz, _id: moduleId,
        maxQuizScore, maxParentalScore } = mod;
  
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activityIndex, setActivityIndex] = React.useState(0);
  const [act, setAct] = React.useState(true);
  const [parentEval, setParentEval] = React.useState(false);
  const [quizEval, setQuizEval] = React.useState(false);
  const [selectedAct, setSelectedAct] = React.useState(0);
  const [selectedEval, setSelectedEval] = React.useState();

  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleActivity = (index) => {
    setAct(true);
    setParentEval(false);
    setQuizEval(false);
    setActivityIndex(index);
    setSelectedAct(index);
    setSelectedEval(null);
  }
  const handleEvaluation = (text, index) => {
    // return setAct(false);
    if (text === 'Parental observation') {
      setParentEval(true);
      setQuizEval(false);
      setAct(false);
    }
       
    else if (text === 'Quiz') {
      setQuizEval(true);
      setAct(false);
      setParentEval(false);
    }
    setSelectedEval(index);
    setSelectedAct(null);
  }
  const handleMenuClick = (text) => {
      if (text === 'Home') 
    return history.push('/');

    if( text === 'Back')
    return window.history.back();

     if( text === 'Community')
    return history.push('/community');
  }
  
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />

       <List>
        {['Home', 'Community', 'Back'].map((text, index) => (
          <ListItem button key={text}
            onClick={() => handleMenuClick(text)}
           >
            <ListItemIcon>
              {index === 0 &&
               <HomeIcon />} 

                 {index === 1 &&
             <ForumIcon/>}

              {index === 2 &&
             <ArrowBackIcon/>}

            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {activityContent.map((activity, index) => (
          <ListItem button key={activity.title}
            onClick={() => handleActivity(index)}
            selected={selectedAct === index ? true : false}>
            <ListItemIcon>{index % 2 === 0 ? <DirectionsBikeIcon/> : <BrushIcon />}</ListItemIcon>
            <ListItemText primary={activity.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Parental observation', 'Quiz'].map((text, index) => (
          <ListItem button key={text}
            onClick={() => handleEvaluation(text, index)}
            selected={selectedEval === index ? true : false}>
            <ListItemIcon>{index % 2 === 0 ? <FeedbackIcon /> : <AssignmentIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
          
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
           {mod.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        
        <Hidden smUp implementation="css">
         
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Container>
        <div className={classes.toolbar} />
        { act && 
          <Activity
          activity={activityContent[activityIndex]} 
          activityIndex={activityIndex}/>
          }

          {quizEval &&
            <Quiz
            quiz={quiz}
            moduleId={moduleId}
            maxQuizScore={maxQuizScore}
            courseId={courseId}/>
          }

          {parentEval &&
            <ParentalEvaluation
            evaluation={evaluation}
            moduleId={moduleId}
            maxParentalScore={maxParentalScore}
            courseId={courseId}/>
          }
        </Container>
      </main>
    </div>
  );
}

ModulePage.propTypes = {
  container: PropTypes.any,
};

export default ModulePage;