import React from 'react';
import Card from './shared/Card';
import Button from './Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackProvider';
import { useState, useContext, useEffect } from 'react';

function FeedbackForm() {
  const [review, setReview] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState(null);
  const [rating, setRating] = useState(10);

  const {updateFeedbackData, editableItem} = useContext(FeedbackContext);

  useEffect(() => {
    if (editableItem.editable === true){
      setReview(editableItem.item.text);
      setRating(editableItem.item.rating);
      setBtnDisabled(false);
    } // if (editableItem.editable == true)
  }, [editableItem]); // useEffect()
  

  function updateReview(e){
    
    setReview(e.target.value);

    if (e.target.value.trim().length < 10){
      setBtnDisabled(true);
      setMessage('Text must be 10 or more characters');
    } // if (e.target.value.trim().length < 10)
    else {
      setBtnDisabled(false);
      setMessage(null);
    } // else
  } // function updateReview(e)

  function handleSubmit(e){
    e.preventDefault();

    let feedback = {
      rating: rating,
      text: review,
    };

    updateFeedbackData(feedback);

    setReview('');
    setBtnDisabled(true);
    setRating(10);
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>

        <RatingSelect minRating={1} 
                         maxRating={10}
                         selectedRating={rating}
                         onSelected={setRating} />

        <input placeholder='Write your review' className='' type='text' value={review} onChange={updateReview}/>
        <Button type={'submit'} version={'primary'} isDisabled={btnDisabled}>
          Submit
        </Button>
        <div>
          {message}
        </div>
      </form>
    </Card>
  );
} // function FeedbackForm()

export default FeedbackForm;