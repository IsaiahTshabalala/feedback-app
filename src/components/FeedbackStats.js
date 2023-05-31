import React, {useContext} from 'react';

import FeedbackContext from '../context/FeedbackProvider';


function FeedbackStats() {
    const {feedbackData: feedback, isLoading} = useContext(FeedbackContext);
    let avrg = 0;
    if (feedback.length > 0)
        avrg = feedback.reduce((total, currFeedbackItem) => {
                    return total + currFeedbackItem.rating;
                }, 0) / feedback.length;

    avrg = avrg.toFixed(1).replace(/[.,]0$/g, '');
    
    return ((isLoading === false) &&
        <div className='feedback-stats'>
            <h4>{feedback.length} reviews</h4>
            <h4>Average Rating: {avrg}</h4>
        </div>
    );
}

export default FeedbackStats;