
import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import logo from '../../illustrations/logo.png';
import  Hidden  from '@material-ui/core/Hidden';

import  './navbar.css';
// const color = '#047b63';
const color = '#ff6987';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchRes: {
    color: color
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  btn: {
    color: color,
    border: `1px solid ${color}`,
    '&:hover': {
      backgroundColor: 'white'
    }
  }, 
  hover: {
    '&:hover': {
      backgroundColor: 'white'
    }
  }
}));

function Navbar(props) {
   
  const { value, onChange, searchResults, onClickSearchItem } = props;
  const classes = useStyles();
const { onAuthClick, onGeneralClick, user } = props;

 const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    return props.history.push('/profile');

  }
  const handleLogout = () =>{
    return props.history.push('/logout');
  }
  return (
    <div className={classes.root}>
          <AppBar position="static"
          style={{ backgroundColor:'white' }}>
        <Toolbar>
         
         <Hidden only={['sm', 'xs']}>
            <Typography className={classes.title} variant="h10" noWrap >
                      
                        <a href='/'>  <img src={logo} /></a>
          </Typography>
           </Hidden>
          <Hidden only={['md', 'lg']}>
           
                      
                        <a href='/'>  <img src={logo} /></a>
        
           </Hidden>
         
                   <div>
                      <Button color="inherit"
                      style={{ color:'black' }}
                      onClick={() => onGeneralClick('community')}>Community</Button>
          </div>
          {
            user && 
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon style={{ color: 'black' }} />
              </div>
              <InputBase
                placeholder="Search community..."
                style={{ color: 'black' }}
                name="search"
                value={value}
                onChange={onChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          }
          
                  {!user &&
                  <>
                  <div>
                      <Button 
                style={{ color: 'black' }}
                onClick={() => onAuthClick('login')}
                className={classes.hover}
              >Login
              </Button>
                  </div>
                 <Hidden only='xs'>
                  <div>
                      <Button  
                onClick={() => onAuthClick('signup')}
                className={classes.btn}
              >For Parents
              </Button>
                  </div>
                 </Hidden>
                  </>
                  }
                  { user &&
            <div>
           
          
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="primary"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>

                  }
        </Toolbar>
        <Container maxWidth='lg'>
          <Grid lg={4} xs={12}>
            {searchResults.map(result => (
              <List key={result._id}>
                <ListItem button>
                  <ListItemText onClick={() => onClickSearchItem(result)} className={classes.searchRes} primary={result.question} />
                </ListItem>
              </List>
            ))}
          </Grid>
        </Container>
      </AppBar>
     
    </div>
  );
}
export default withRouter(Navbar)