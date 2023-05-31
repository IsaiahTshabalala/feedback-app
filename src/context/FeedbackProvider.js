import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const FeedbackContext = createContext();

export function FeedbackProvider({children}){
    const [feedbackData, setFeedbackData] = useState([]);
    const [editableItem, setEditableItem] = useState({editable: false});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRequest()
        .then(result=> {
            setFeedbackData(result.json);
            setIsLoading(false);
        },error=> alert(`Error status ${error.status}: ${error.statusText}`)
        )
    }, []);

    async function getRequest(id){
        let path = `/feedback${(id !== undefined)? "/" + id: ""}`;
        path += "?_sort=id&_order=desc";
        console.log(path);
        const response = await fetch(path,
            { 
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });

            if (response.status === 200){
                let output;
                let success = false;
                await response.json()
                        .then(results=>{
                            output = {
                                status: response.status,
                                statusText: response.statusText,
                                json: results
                            };
                            success = true;
                        },error=>{
                            output = {
                                status: undefined,
                                statusText: "Some error occured."
                            }
                        });
                return success? Promise.resolve(output) : Promise.reject(output);
            } // if (response.status === 200)
            else
                return Promise.reject({status: response.status, statusText: response.statusText});
    } // async function getRequest(id)
    
    async function deleteRequest(id){

        let path = "/feedback";
        if (id === undefined || id === null)
            return Promise.reject({status: 400, statusText: "Bad Request"});

        path += "/" + id;

        const response = await fetch(path,
                                        { 
                                            method: "DELETE",
                                            headers: {"Content-Type": "application/json"}
                                        });
        if (response.status >= 200 && response.status <= 204){
            let output;
            let success = false;
            await response.json()
                    .then(result=>{
                        success = true;
                        output = {status: response.status, statusText: response.statusText, json: result}
                    },
                    error=> {
                        console.log(error);
                        output = {status: undefined, statusText: "Some error occured."};
                    });
            return success? Promise.resolve(output) : Promise.reject(output);
        }
        else
            return Promise.reject({status: response.status, statusText: response.statusText});
    } // function deleteRequest()

    async function postRequest(feedback){
        feedback.rating = +feedback.rating;
        delete feedback.id;

        const response = await fetch("/feedback",
                                        {
                                            method: "POST",
                                            headers: {"Content-Type": "application/json"},
                                            body: JSON.stringify(feedback)                                 
                                        });
        if (response.status >= 200 && response.status <= 201){
            let output;
            let success = false;
            await response.json()
                    .then(results=>{
                        output = {
                            status: response.status,
                            statusText: response.statusText,
                            json: results
                        };
                        success = true;
                    },error=>{
                        output = {
                            status: undefined,
                            statusText: "Some error occured."
                        }
                    });
            return success? Promise.resolve(output) : Promise.reject(output);
        }
        else
            return Promise.reject({status: response.status, statusText: response.statusText});
    } // async function postRequest(feedback)

    async function patchRequest(feedback){
        feedback.rating = +feedback.rating;

        const path = `/feedback/${feedback.id}`;
        const response = await fetch(path,
                                        {
                                            method: "PATCH",
                                            headers: {"Content-Type": "application/json"},
                                            body: JSON.stringify(feedback)                                 
                                        });
        if (response.status >= 200 && response.status <= 226){
            let output;
            let success = false;
            await response.json()
                    .then(results=>{
                        output = {
                            status: response.status,
                            statusText: response.statusText,
                            json: results
                        };
                        success = true;
                    },error=>{
                        output = {
                            status: undefined,
                            statusText: "Some error occured."
                        }
                    });
            return success? Promise.resolve(output) : Promise.reject(output);
        }
        else
            return Promise.reject({status: response.status, statusText: response.statusText});
    } // async function patchRequest(feedback)

    function deleteFeedback(id){
        deleteRequest(id)
            .then(result=> {
                setFeedbackData(feedbackData.filter(item=> item.id !== id));
                alert("Review removed.");
            }, error=> {
                alert(`Error ${error.status}: ${error.statusText}`);
            });
    } // async function deleteFeedback(feedback)

    function updateFeedbackData(feedback){
        feedback.rating = +feedback.rating;
        if (editableItem.editable === false){ // Add new feedback item
            postRequest(feedback)
            .then(result=>{
                        setFeedbackData(prev=> [result.json, ...feedbackData]);
                        alert("New review added.");
                    },
                  error=> alert(`Error ${error.status}: ${error.statusText}`));            
        } // if (editableItem.editable === false)
        else{ // Update feedback item.
            const index = feedbackData.findIndex((item=> item.id === editableItem.item.id));
            
            if (editableItem.item.text === feedback.text && editableItem.item.rating === feedback.rating)
                return;

            if (index >= 0){
                feedback.id = editableItem.item.id;
                patchRequest(feedback)
                .then(result=> {
                    // Update FeedbackData array at the newly updated feedback item.
                    setFeedbackData(feedbackData.map(item=> {
                        return (item.id === feedback.id)? feedback : item;
                    }));
                    alert("Review updated.")
                },
                error=> alert(`Error ${error.status}: ${error.statusText}`));
            } // if (index >= 0)
            else
                alert('Could not update feedback item.');
            
            setEditableItem({editable: false});
        } // else
    } // function updateFeedbackData(feedback)

    function setEditable(item){
        setEditableItem({item: item, editable: true});
    } // function setEditable(item)

    return (
        <FeedbackContext.Provider value={{feedbackData,
                                          isLoading,
                                          deleteFeedback,
                                          updateFeedbackData,
                                          editableItem,
                                          setEditable}} >
            {children}
        </FeedbackContext.Provider>
    );
}

FeedbackProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default FeedbackContext;