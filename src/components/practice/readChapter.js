import React, { useState, useEffect } from 'react'

const ReadChapter = (props) => {
  
    const chapterFromLink = props.location.state;
    const [chapter, setChapter] = useState(chapterFromLink);

    return (
    <>
            <h1>{chapter.title}</h1>  
            <p>{chapter.content}</p>
    </>
  )
}

export default ReadChapter
