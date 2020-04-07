import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
//import ps from '../illustrations/ps.svg';
import welcome1 from '../illustrations/welcome-1.svg';
import welcome_small from '../illustrations/welcome_small.svg';
// import  Container  from '@material-ui/core/Container';
import  Typography  from '@material-ui/core/Typography';
import Footer from './course/Footer';
import  Hidden  from '@material-ui/core/Hidden';

const color = '#ff6987';
// const style = {
//   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//   borderRadius: 3,
//   border: 0,
//   color: 'white',
//   height: 48,
//   padding: '0 30px',
//   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
// };
const useStyles = makeStyles(theme => ({
  btn: {
    border: `2 px solid ${color}`,
    backgroundColor: color,
    fontFamily: 'Roboto',
    fontWeight:'600',
    fontSize: '18px',
    color: 'white',
    padding: '15px',
    '&:hover': {
      backgroundColor:color
    }
  }
}))

const Welcome = (props) => {
  
  const classes = useStyles();
  const handleClick = () => {
    return props.history.push('/auth/signup');
  }
  return (
    <>
      <br />
   
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
        <Hidden mdDown>
            <img src={welcome1} />
          </Hidden>
          <Hidden only='lg'>
            <img src={welcome_small} />
          </Hidden>
        </Grid>
        
        <Grid item xs>
        <Hidden mdDown>
            <Typography variant='h4'
            style={{ fontWeight: '800' }}>
            <br/>
            An alternate school for upskilling your kids <br/> 
            with responsible problem solving skills and value based education
            
           </Typography>
          </Hidden>
          <Hidden only='lg'>
            <Typography variant='h5'
            style={{ fontWeight: '800' }}>
            <br/>
            An alternate school for upskilling your kids <br/> 
            with responsible problem solving skills and value based education
            
           </Typography>
          </Hidden>

          <Typography variant='h6' style={{ fontWeight: '500' }}>
            <br />
          Enroll now for classes 6 to 8.
         </Typography>
          <br />
          
          <Button
            type="submit" 
            variant="contained"
            onClick={handleClick}
            className={classes.btn}
          >
              Parents get started
          </Button>
           
        </Grid>
       
      </Grid>
      
       <Footer title="For a happy learning and growing experience!" description="" />

    </>
  )
}

export default withRouter(Welcome);
