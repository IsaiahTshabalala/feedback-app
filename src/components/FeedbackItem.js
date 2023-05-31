import React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import {FaTimes, FaEdit} from 'react-icons/fa';
import FeedbackContext from '../context/FeedbackProvider';

import Card from './shared/Card';

function FeedbackItem({feedbackItem}) {
  const {deleteFeedback, setEditable} = useContext(FeedbackContext);


  function deleteItem(e){
    if (window.confirm('Are you sure you want to delete this item?')){
      deleteFeedback(feedbackItem.id);
    } // if (window.confirm('Are you sure you want to delete this item?'))
  }

  return (
    <Card cardReverse={true}>
      <div className='num-display'>{feedbackItem.rating}</div>
      <button className='edit'>
        <FaEdit color='Purple' onClick={e=> setEditable(feedbackItem)}/>
      </button>
      <button className='close' onClick={deleteItem}>
        <FaTimes color='Purple'/>
      </button>
      <div className='text-display'>{feedbackItem.text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  feedbackItem: 
    PropTypes.exact({
      id: PropTypes.any.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired
    })
};
export default FeedbackItem;