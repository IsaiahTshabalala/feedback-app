import React from 'react';
import {BiError} from 'react-icons/bi';
import {useRouteError} from 'react-router-dom';

function ErrorPage() {
    const error = useRouteError();

    return (
        <div>
            <h1>Error <BiError/></h1>
            <p>{error.status}</p>
            <p>{error.statusText}</p>
            <p>{error.data}</p>
        </div>
);
}

export default ErrorPage;