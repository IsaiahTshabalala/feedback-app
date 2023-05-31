import React, {useContext} from 'react';
import FeedbackContext from '../context/FeedbackProvider';
import FeedbackItem from './FeedbackItem';
import spinnerImg from '../assets/Spinner.png';

function FeedbackList() {
  const {feedbackData: feedback, isLoading} = useContext(FeedbackContext);

  return (
    isLoading?
    <div>
      <h1>Loading...</h1>
      <img alt='data loading' src={spinnerImg} />
    </div>
    :
    <div>
      {
        feedback.map((item, index) => 
            <FeedbackItem
              key={item.id}
              feedbackItem={item}
            />)
      }
    </div>
  );
}

export default FeedbackList;