import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const color = '#ff6987';

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    heading: {
    fontWeight: '500',
    color: color
  },
   mainHeading: {
    fontWeight: '500',
    color:'black'
  },
  text:{
      color:'black'
  }
});

export default function FeaturedPost(props) {
    const classes = useStyles();
    const { mod, onClick, index } = props;

    return (
        
            <CardActionArea onClick={onClick}>
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5" className={classes.mainHeading}>
                              {`Module ${index + 1}: 
                              ${mod.title}`}
                            </Typography>
                        
                             <Typography component="h2" variant="h6" className={classes.heading}>
                                Course description
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {mod.description}
                            </Typography>

                            <Typography component="h2" variant="h6" className={classes.heading}>
                                Course purpose
                            </Typography>
                            <Typography variant="subtitle1" className={classes.text}>
                                 {mod.purpose}
                     </Typography>
                        </CardContent>
                    </div>
                   
                </Card>
                <br/>
            </CardActionArea>
       
    );
}

FeaturedPost.propTypes = {
    mod: PropTypes.object,
};