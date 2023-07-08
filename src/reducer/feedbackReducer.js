//File: FeedbackProvider.js
// Contents: The reducer and the functions that facilitate GET, UPDATE, DELETE and PATCH requests to the api.
export function feedbackReducer(state, action) {
    let updatedArray;
    switch(action.type){
        case 'GET_ALL':
            return {...state, feedbackData: action.payload.feedbackData, feedbackLoaded: true};
            break;
        case 'UPDATE':
            const updatedFeedbackItem = action.payload.updatedFeedbackItem;
            updatedArray = state.feedbackData.map(item => {
                if (item.id === updatedFeedbackItem.id)
                    return updatedFeedbackItem;
                    
                return item;
            });
            return {...state, feedbackData: updatedArray};
            break;
        case  'DELETE':
            const idToBeDeleted = action.payload.idToBeDeleted;
            updatedArray = state.feedbackData.filter(item => (item.id !== idToBeDeleted));
            return {...state, feedbackData: updatedArray};
            break;
        case 'ADD_NEW':
            const newFeedbackItem = action.payload.newFeedbackItem;
            updatedArray = [newFeedbackItem, ...state.feedbackData];
            return {...state, feedbackData: updatedArray};
            break;
        case 'SET_EDITABLE':
            return {...state, editableFeedback: action.payload.feedback };
            break;
        default:
            return state;
            break;
    } // switch(action.type)
} // export function feedbackReducer(state, action)

export async function getRequest(id){
    let path = `/feedback${(id !== undefined)? "/" + id: ""}`;
    path += "?_sort=id&_order=desc";
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

export async function deleteRequest(id){

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

export async function postRequest(feedback){
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

export async function patchRequest(feedback){
    feedback.rating = +feedback.rating;

    if (feedback.id === undefined)
        return Promise.reject({
            status: 404,
            statusText: "Not found. Please provide the feedback id"
        });

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