import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const color = '#ff6987';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Tremollo
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        // marginTop: theme.spacing(8),
        padding: theme.spacing(6, 0),
    },
     btn: {
        color: color,
        border: `1px solid ${color}`,
        fontSize: '12px'
    }
}));

export default function Footer(props) {
    const classes = useStyles();
    const { description, title, onEnrollClick, enrolled, toShowEnroll } = props;

    return (
        <footer className={classes.footer}>
            
            <Container maxWidth="lg">
                  {toShowEnroll &&
                            <Typography align="center" gutterBottom>
                           <Button
                            disabled={enrolled}
                            className={classes.btn}
                            onClick={onEnrollClick}>{!enrolled ? 'Enroll Now' : 'Thanks for enrolling!'}
                            </Button>
                            </Typography>
                           }
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                         
                          
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    {description}
                </Typography>
              
                <Copyright />
            </Container>
        </footer>
    );
}

Footer.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};