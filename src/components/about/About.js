import React from 'react';
import Card from '../shared/Card';
import { NavLink } from 'react-router-dom';
import { FaQuestion } from 'react-icons/fa';

function About() {
  return (
    <Card>
      <>
        <div>
          <h1>About</h1>
          <p>This is a Feedback App.<br/>
            It is used by customers to submit feedback for the products and services received.
          </p>
        </div>
        <NavLink className='about-link' to='/'>Home<FaQuestion/></NavLink>
      </>      
    </Card>
  )
}

export default About;