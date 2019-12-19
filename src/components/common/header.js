import React from 'react'

import { Link } from 'react-router-dom';

const Header = ({user}) => {
  return (
    <>
      <h1>{user ? `${user.firstName}'s ` : null}</h1> 
      
        
    </>
  )
}

export default Header
