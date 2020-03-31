import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { slug } from '../../utils/urlSlug';
import courseillus from '../../illustrations/joyride.svg';
import { toast } from 'react-toastify';
import { Button } from '@material-ui/core';
import dataService from '../../services/dataServices';

const color = '#ff6987';

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
  heading: {
    fontWeight: '500',
    color: color
  }, btn: {
    color: color,
    border: `1px solid ${color}`,
    fontSize:'20px'
  }
}));


export default function CoursePage(props) {
  const classes = useStyles();
  const history = useHistory();
  const course = props.location.state;
  const { skills, transformation, modules, _id: courseId } = course;

  const [enrolled, setEnrolled] = React.useState(false);
  const [enrolledCourses, setEnrolledCourses] = React.useState([{}]);

  React.useEffect(() => {
    // api to fetch enrolled courses
    const fetchEnrolledCourses = async () => {
     try{
     const {data} = await dataService.fetchOne('users/enrolledCourses');
       for (let course of data){
        if(course.courseId === courseId){
          setEnrolled(true);
          break;
        }

        // console.log(course, courseId);
      }
      setEnrolledCourses(data);
      // console.log(data);
      // console.log(courseId)
    
     }
     catch(e){
       console.log(e.message)
     }
    }
    fetchEnrolledCourses();
  }, [])
  
  // module click
  const handleModuleClick = (mod) => {
    let data = {
      mod,
      courseId
    }
    return enrolled ? history.push(`/modules/${slug(mod.title)}`, data) :
                      toast.success('Kindly enroll in the course to access');
  }
  const handleEnroll = async () => {
    setEnrolled(true);
    try{
      const { data } = await dataService.postData({resource:'users/enroll', data: {courseId} }) ;
      toast.success('Enrolled successfully! Now access the course');
      setEnrolled(true);
      setEnrolledCourses(data);
    }
    catch(e){
      toast.error('Already enrolled');
      setEnrolled(false);

    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
     
        {/* <Header title="Blog" sections={sections} /> */}
        <main>
        <Container maxWidth="lg">  
          <br/>
          <MainFeaturedPost course={course}
            enrolled={enrolled}
            onEnrollClick={handleEnroll}/>
          
          <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={6}>
            
           <CardActionArea>
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                          <Typography component="h2" variant="h6">
                         Skills your kid will gain
                         </Typography>
                          {skills.map(skill => (
                             <Typography variant="subtitle1" paragraph>
                                {skill}
                            </Typography>
                          
                          ))}
                            
                        </CardContent>
                    </div>
                 
                </Card>
            </CardActionArea>
            
            </Grid>
             <Grid item xs={12} md={6} lg={6}>
            
           <CardActionArea>
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                          <Typography component="h2" variant="h6">
                        What your kid will learn
                         </Typography>
                          {transformation.map(t => (
                            <Typography variant="subtitle1" paragraph>
                                {t}
                            </Typography>
                          
                          ))}
                            
                        </CardContent>
                    </div>
                    
                </Card>
            </CardActionArea>
            
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.mainGrid}>
            
            <Grid item xs={12} lg={6} md={6}>
             <Typography component="h2" variant="h4" className={classes.heading}>
                        What's there in the course
                         </Typography>
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <Button
              className={classes.btn}
              onClick={handleEnroll}
              disabled={enrolled}
              >{!enrolled ? 'Enroll to access' : 'Thanks for enrolling!'}</Button>
            </Grid>
            </Grid>
          <Grid container spacing={10} className={classes.mainGrid}>
       <Grid item xs={12} md={12} lg={12}>
            <img src={courseillus} alt="course"/> 
            </Grid>
           
              {modules.map((m, index) => (
                <Grid item xs={12} lg={6} md={6}> 
                    <FeaturedPost key={m.title} mod={m} index={index} onClick={()=>handleModuleClick(m)}/>  
                </Grid>
                    ))
                    }
             
          </Grid>
           </Container>
        </main>
     
      <Footer title="For a happy learning and growing experience!" description="" 
       toShowEnroll={true}
       enrolled={enrolled} 
      onEnrollClick={handleEnroll}/>
    </React.Fragment>
  );
}