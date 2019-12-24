import React, { useState, useEffect } from 'react'

import  Grid  from '@material-ui/core/Grid';
import  Container  from '@material-ui/core/Container';
import  Typography  from '@material-ui/core/Typography';
import  Button  from '@material-ui/core/Button';

import dataService from '../../services/dataServices';
import { toast } from 'react-toastify';
import { arrFilter } from './../../utils/generalFunc';

const color = '#047b63';
const ReadChapter = (props) => {
  
    const chapterFromLink = props.location.state;
    const [chapter, setChapter] = useState(chapterFromLink);
    const [note, setNote] = useState('');

    useEffect(() => {
      async function getNotes() {
        try {
          const { data } = await dataService.fetchAll('notes');
          //console.log(data);
          const arr = arrFilter(data, 'chapter_id', chapter._id);
          // console.log(chapter._id);
          console.log(arr);
          // let notes = ''
          // for (let i of arr)
          // {
          //   notes = `${notes} ${i.content}`; 
          // }
          //notes = notes.trim();
          const notes = arr[arr.length - 1].content.trim();
          setNote(notes);
        }
        catch (e) {
          setNote('');
       }
      }
      getNotes();
    }, [])
  const handleChange = ({currentTarget: input}) => {
    let newNote = input.value;
    setNote(newNote);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let oldNote = note;
    try {
      const chapNote = {
        content: note
      }
      const { data } = await dataService.postData({ resource: 'notes', parameter: chapter._id, data: chapNote });
      toast.success('Notes saved!');
      console.log(data);
    }
    catch (e) {

      toast.error(e.message)
    }
  }
    return (
      <Container>
        <br/>
        <br/>
        <Grid container spacing={6}>
          <Grid item lg={8}>
            <Typography gutterBottom variant='h3'>
              {chapter.title} 
            </Typography>
            <Typography gutterBottom variant='h6'>
              {chapter.content}
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography gutterBottom variant='h4'>
              Quick Notepad
              
            </Typography>
            <form onSubmit={handleSubmit}>
              <textarea name="notes"
                placeholder="Take quick notes here..." id="" cols="50" rows="10"
                value={note}
                onChange={handleChange}></textarea>
            <Button variant="outlined"
                style={{ color: color, border: `1px solid ${color}` }}
               
                type='submit'
            >Save notes
            </Button>
              </form>
          </Grid>
          </Grid>
    </Container>
  )
}

export default ReadChapter
