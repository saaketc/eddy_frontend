import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
//import ps from '../illustrations/ps.svg';
import welcome1 from '../illustrations/welcome-1.svg';
// import  Container  from '@material-ui/core/Container';
import  Typography  from '@material-ui/core/Typography';
import Footer from './course/Footer';

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
    color: 'white',
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
        <Grid item xs>
        <img src={welcome1}/>
        </Grid>
        <Grid item xs>
          <Typography variant='h4'
            style={{ fontWeight: '700' }}>
            <br/>
            A creative and value based <br/>learning 
            for <br/> kids 
         </Typography>
          {/* <Typography variant='h6'>
            <br />
           Join now to understand different soft skills techniques, <br/>
             get better at applying them in the real world <br/> with our LoopSpace practice ground and community.
         </Typography> */}
          <br/>
          <Button
            type="submit" 
            variant="contained"
            onClick={handleClick}
            className={classes.btn}
          >
            Get started
          </Button>
        </Grid>
       
      </Grid>
      
       <Footer title="For a happy learning and growing experience!" description="A product of Tremollo" />

      {/* <footer>

        <small style={{ fontFamily: 'Roboto' }}>Copyright &copy;  {new Date().getFullYear()} <Link color='inherit' href='/'>Tremollo | </Link> <Link color='inherit' href='/'>Terms  </Link>
         | <Link color='inherit' href='/'> Privacy</Link></small>
      
        

        </footer> */}
    </>
  )
}

export default withRouter(Welcome);
