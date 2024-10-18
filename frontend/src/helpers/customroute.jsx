import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthenticateRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (!localStorage.getItem('user')) {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            return <Component {...props} />
        }} />
    );
}

function NoAuthenticateRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            // if (localStorage.getItem('user')) {
            //     return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            // }
            localStorage.removeItem('user');
            return <Component {...props} />            
        }} />
    );
}

export { AuthenticateRoute , NoAuthenticateRoute };