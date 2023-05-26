import React, {useContext} from 'react';
import FeedbackContext from '../context/FeedbackProvider';
import FeedbackItem from './FeedbackItem';

function FeedbackList() {
  const {feedbackData: feedback} = useContext(FeedbackContext);

  return (
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