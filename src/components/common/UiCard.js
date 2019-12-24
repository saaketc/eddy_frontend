import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        
    },
    media: {
        height: 140,
    },
});

export default function UiCard(props) {

    // const [color, setColor] = React.useState('#047b63');
    // const [textColor, setTextColor] = React.useState('white');
    
    const classes = useStyles();
   
    const { image, content, data, property, mediaHeight, buttonLabel1, buttonLabel2, onClick } = props;
    return (
        <Card className={classes.card}
           
            onClick={() => onClick ? onClick(data) : null}>
            <CardActionArea>
                <CardMedia
                    
                    className={mediaHeight ? classes.media : null}
                    image={image}
                    title={data[property]}
                />
                <CardContent >
                    <Typography gutterBottom variant="h6" component="h2">
                        {data[property]}
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       {content}
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {/* <Button size="small" color="primary">
                  {buttonLabel1}
        </Button> */}
                {/* <Button size="small" color="primary">
                    {buttonLabel2}
        </Button> */}
            </CardActions>
        </Card>
    );
}