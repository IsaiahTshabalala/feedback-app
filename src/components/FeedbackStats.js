import React, {useContext} from 'react';

import FeedbackContext from '../context/FeedbackProvider';


function FeedbackStats() {
    const {feedbackData, isLoading} = useContext(FeedbackContext);
    let avrg = 0;
    if (!isLoading && feedbackData.length > 0)
        avrg = feedbackData.reduce((total, currFeedbackItem) => {
                    return total + currFeedbackItem.rating;
                }, 0) / feedbackData.length;

    avrg = avrg.toFixed(1).replace(/[.,]0$/g, '');
    
    return ((isLoading === false) &&
        <div className='feedback-stats'>
            <h4>{feedbackData.length} reviews</h4>
            <h4>Average Rating: {avrg}</h4>
        </div>
    );
}

export default FeedbackStats;