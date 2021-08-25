import React from 'react';
import { Route, Redirect, Router} from 'react-router-dom';

function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {
    return (
        <Route {...rest} render = {(props) => {
            if(isAuth){
                console.log("Success");
                return <Component />
            }else{
                console.log("Fail");
                return <Redirect to={{pathname: '/login-admin', state: { from: props.location } }} />;
                //return <Route exact path="/admin"/>
            }
        }} />
    );
}

export default ProtectedRoute;