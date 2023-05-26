import React from 'react';
import {Navigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';

function Post() {
    const params = useParams();

    if ((params.name === 'Sgebengu'))
        return (<Navigate to='/notfound' />) ;

    return (
        <div>
            <h1>Post</h1>
            <p>Id: {params.id}</p>
            <p>Name: {params.name}</p>

        </div>
    );
}

export default Post;