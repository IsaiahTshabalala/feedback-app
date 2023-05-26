import { createContext, useState } from "react";
import FeedbackData from "../data/FeedbackData";
import {v4 as uuidV4} from "uuid";

const FeedbackContext = createContext();

export function FeedbackProvider({children}){
    const [feedbackData, setFeedbackData] = useState(FeedbackData);
    const [editableItem, setEditableItem] = useState({editable: false});

    function deleteFeedback(id){
        setFeedbackData(feedbackData.filter(item=> item.id !== id));
    }
    
    function updateFeedbackData(feedback){

        
        // Add new feedback item.
        if (editableItem.editable === false){
            feedback.id = uuidV4();
            setFeedbackData([feedback, ...feedbackData]);
        } // if (editableItem.editable === false)
        else{ // Update a feedback item.
            const index = feedbackData.findIndex((item=> item.id === editableItem.item.id));
            
            if (index >= 0){
                feedbackData[index] = {id: editableItem.item.id, ...feedback};
                setEditableItem({editable: false});
            } // if (index >= 0)
            else
                alert('Could not update feedback item.');
        } // else
    } // function updateFeedbackData(feedback)

    function setEditable(item){
        setEditableItem({item: item, editable: true});
    }

    return (
        <FeedbackContext.Provider value={{feedbackData, deleteFeedback, updateFeedbackData, editableItem, setEditable}} >
            {children}
        </FeedbackContext.Provider>
    );
}

export default FeedbackContext;