import React from 'react'
import { Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import musicbird from '../../illustrations/donut.svg';
import exercise from '../../illustrations/exercise.svg';
import musicbird_small from '../../illustrations/donut_small.svg';
import exercise_small from '../../illustrations/exercise_small.svg';
import  Hidden  from '@material-ui/core/Hidden';

const color = '#ff6987'
const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  bold: {
    fontWeight: '500'
  },
  heading: {
    fontWeight: '500',
    color: color
  }
}));

const Activity = (props) => {
  const classes = useStyles();

  const { activity, activityIndex } = props;
  const { instructions, story, parts } = activity.content;
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4}>
       <Hidden mdDown>
          <Grid item xs={12} sm={12} md={6} lg={6}>
          <img src={activityIndex === 0 ? exercise : musicbird} alt="activity" />
        </Grid>
         </Hidden>
      <Hidden only='lg'>
          <Grid item xs={12} sm={12} md={6} lg={6}>
             <Hidden only='lg'>
            <Typography variant='h4' className={classes.heading}>
            Activity {activity.title}
          </Typography>
          <br/>
          <br/>
          </Hidden>
          <img src={activityIndex === 0 ? exercise_small : musicbird_small} alt="activity" />
        </Grid>
         </Hidden>

        <Grid item xs={12} sm={12} md={6} lg={6}>
        <Hidden mdDown>
            <Typography variant='h3' className={classes.heading}>
            Activity {activity.title}
          </Typography>
          </Hidden>
          <br />
          <br />

          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4} lg={4}>

              <CardActionArea>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography variant='h6' className={classes.bold}>
                        Materials Required for the activity
                     </Typography>

                      <Typography variant="subtitle1" paragraph>
                        {activity.materials}
                      </Typography>
                    </CardContent>
                  </div>

                </Card>
              </CardActionArea>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>

              <CardActionArea>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography variant='h6' className={classes.bold}>
                        Characters for the activity
                    </Typography>

                      <Typography variant="subtitle1" paragraph>
                        {activity.characters}
                      </Typography>
                    </CardContent>
                  </div>

                </Card>
              </CardActionArea>
            </Grid>
          </Grid>
          <br />
          <br />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>

          <Typography variant='h5' className={classes.bold}>
            How to perform the activity
        </Typography>
          <br />
          <Typography variant="subtitle1" paragraph>
            {instructions}
          </Typography>
          <br />
          <br />
          {story &&
            <>
              <Typography variant='h5' className={classes.bold}>
                Story
              </Typography>
              <br />
              <Typography variant="subtitle1" paragraph>
                {story}
              </Typography>
              <br />
              <br />
            </>
          }
          {
            parts.map(part => (
              <div>
                <Typography variant='h5' className={classes.bold}>
                  {part.title}
              </Typography>
                <br />
                <Typography variant="subtitle1" paragraph>
                  {part.content}
                </Typography>
              </div>
            ))
          }

        </Grid>
      </Grid>
    </Container>
  )
}

export default Activity
