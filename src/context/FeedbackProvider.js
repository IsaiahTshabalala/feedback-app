// File: FeedbackProvider.js
import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { feedbackReducer, getRequest, postRequest, deleteRequest, patchRequest } from "../reducer/feedbackReducer";

const FeedbackContext = createContext();

const initialFeedbackState = {
    feedbackData: [],
    feedbackLoaded: false,
    editableFeedback: null
};

export function FeedbackProvider({children}){
    const [feedbackState, feedbackDispatch] = useReducer(feedbackReducer, initialFeedbackState);

    useEffect(() => {
        getRequest()
        .then(result=> feedbackDispatch({type: "GET_ALL", payload: {feedbackData: result.json}}),                
              error=> alert(`Error status: ${error.status}: ${error.statusText}`));
    }, []);

    function addNewFeedback(feedback){
        postRequest(feedback)
        .then(result=> {
            feedbackDispatch({type: "ADD_NEW", payload: {newFeedbackItem: result.json}});
            alert("New feedback added.");
        }, error=> error=> alert(`Error status: ${error.status}: ${error.statusText}`));
    }
    
    function updateFeedback(feedback){
        let toUpdate = false;

        Object.keys(feedback).forEach(key=> {
            if (feedback[key] !== feedbackState.editableFeedback[key])
                toUpdate = true;
        });

        if (toUpdate === false)
            return;

        feedback = {...feedback, id: feedbackState.editableFeedback.id};
        patchRequest(feedback)
        .then(result=> {
                feedbackDispatch({type: "UPDATE", payload: {updatedFeedbackItem: result.json}});
                alert("Feedback updated.");
            }, error=> error=> alert(`Error status: ${error.status}: ${error.statusText}`));        
    }

    function setEditable(feedback){
        feedbackDispatch({type: "SET_EDITABLE", payload: {feedback}});
    }

    function deleteFeedback(id){
        deleteRequest(id)
        .then(result=> {
                feedbackDispatch({type: "DELETE", payload: {idToBeDeleted: id}});
                alert("Feedback deleted.");
            }, error=> alert(`Error status: ${error.status}: ${error.statusText}`));
    }
    
    return (
        <FeedbackContext.Provider value={{feedbackData: feedbackState.feedbackData,
                                        isLoading: !feedbackState.feedbackLoaded,
                                        addNewFeedback, updateFeedback, setEditable, deleteFeedback,
                                        editableFeedback: feedbackState.editableFeedback}} >
            {children}
        </FeedbackContext.Provider>
    );
}

FeedbackProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default FeedbackContext;