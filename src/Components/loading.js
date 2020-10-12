import React from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router';
import { record } from '../images/index';

export default function Loading(props) {
    return (
        <div id="loading-screen">
            <img src={ record } alt="loading-record" className="loading-record"/>
            <Redirect
                to={{
                pathname: "/home",
                state: { token: queryString.parse(props.location.search).access_token }
              }}
            />
        </div>
    )
}
