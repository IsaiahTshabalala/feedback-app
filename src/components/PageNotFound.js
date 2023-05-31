import React from 'react';
import {BiError} from 'react-icons/bi';
import {FaQuestion} from 'react-icons/fa';
import {NavLink, useRouteError} from 'react-router-dom';

function PageNotFound({statusError}) {
    const error = useRouteError();

    return (
        <div>
            <h1>Error <BiError/></h1>
            <p>{error.status}</p>
            <p>{error.statusText}</p>
            <NavLink to='/'>Home<FaQuestion/></NavLink>
        </div>
);
}

PageNotFound.defaultProps = {statusError: {}}

export default PageNotFound;