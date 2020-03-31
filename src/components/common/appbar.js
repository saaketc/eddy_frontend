import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

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
        [theme.breakpoints.up('sm')]: {
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
const Appbar = (props) => {
    const { classes, prop1, prop2, onClick, user } = props;

    const handleLogout = () => {
        return props.history.push('/logout')
    }
    return (
      <AppBar position="fixed" className={classes['prop1']}>
          <Toolbar>
              <IconButton
                  color="inherit"
                   
                  edge="start"
                  onClick={onClick}
                  className={classes['prop2']}
              >
                  <MenuIcon />
              </IconButton>
                <Typography className={classes.title} variant="h4" noWrap >

                    {/* <a href='/'>  <img src={logo} /></a> */}
                    <a style={{ textDecoration: 'none', color: color }} href='/'>Eddy </a>
                </Typography>
                {
                    user &&
                    <div>
                        <Button color="inherit"
                            style={{ color: 'black' }}
                            onClick={() => onGeneralClick('practice')}>Playground</Button>
                        {/* <Button color="inherit"
                style={{ color: 'black' }}
                onClick={() => onGeneralClick('loopSpace')}>LoopSpace</Button> */}
                    </div>
                }
                <div>
                    <Button color="inherit"
                        style={{ color: 'black' }}
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
                            <Button color="inherit"
                                style={{ color: 'black' }}
                                onClick={() => onAuthClick('login')}
                                className={classes.hover}
                            >Login
              </Button>
                        </div>
                        <div>
                            <Button color="inherit"
                                onClick={() => onAuthClick('signup')}
                                className={classes.btn}
                            >For parents
              </Button>
                        </div>
                    </>
                }
                {user &&
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
                            <MenuItem >Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>

                }
          </Toolbar>
      </AppBar>
  )
}

export default Appbar
