import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import  Hidden  from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
    mainFeaturedPost: {
        position: 'relative',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        paddingBottom: '20px',
        paddingRight: '20px',
        paddingTop: '20px',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    mainFeaturedPostContent: {
        fontFamily: 'Roboto, sans-serif',
        color: 'white',
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 20,
        },
        
    },
    btn: {
        color: 'white',
        border: `1px solid black`,
        fontSize: '20px'
    }
}));

export default function MainFeaturedPost(props) {
    const classes = useStyles();
    const { course, enrolled, onEnrollClick, courseScore } = props;

    return (
        <Paper className={classes.mainFeaturedPost}>
            <div className={classes.overlay} />
          <Hidden mdDown>
                <Typography variant="h4" align='right'>
                {courseScore > 0  ? `Current grade: ${courseScore}%` : ''}
            </Typography>
            <Typography variant="h5" align='right'>
                {(courseScore > 0 && courseScore >= 50) ? `Your kid is doing great! Keep learning`
                    :
                    `Never stop learning and having fun! Keep going`}
            </Typography>
            <br/>
            <Typography align='right' variant='h3'>
                <Button
                    disabled={enrolled}
                    className={classes.btn}
                    onClick={onEnrollClick}>{!enrolled ? 'Enroll now' : 'Thanks for enrolling!'}</Button>
            </Typography>
              </Hidden>
            <Grid container>
                <Grid item md={6}>
                    <div className={classes.mainFeaturedcourseContent}>
                      <Hidden mdDown>
                            <Typography component="h1" variant="h2" gutterBottom align='center'>
                            {course.title}
                        </Typography>
                        <Typography variant="h6"  paragraph align='center'>
                            {course.description}
                        </Typography>
                          </Hidden>

                           <Hidden only='lg'>
                            <Typography component="h1" variant="h3" gutterBottom align='center'>
                            {course.title}
                        </Typography>
                        <Typography variant="h7"  paragraph align='center'>
                            {course.description}
                        </Typography>
                          </Hidden>

                           <Hidden only='lg'>
                <Typography variant="h5" align='right'>
                {courseScore > 0  ? `Current grade: ${courseScore}%` : ''}
            </Typography>
            <Typography variant="h6" align='right'>
                {(courseScore > 0 && courseScore >= 50) ? `Your kid is doing great! Keep learning`
                    :
                    `Never stop learning and having fun! Keep going`}
            </Typography>
            <br/>
            <Typography align='right' variant='h6'>
                <Button
                    disabled={enrolled}
                    className={classes.btn}
                    onClick={onEnrollClick}>{!enrolled ? 'Enroll now' : 'Thanks for enrolling!'}</Button>
            </Typography>
              </Hidden>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}

MainFeaturedPost.propTypes = {
    course: PropTypes.object,
};