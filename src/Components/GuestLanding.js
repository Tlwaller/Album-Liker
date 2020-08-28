import React from "react";
import Axios from "axios";

export default function Guestlanding() {
    const scopes = 'user-read-private user-read-email';

    return (
        <div className='guest-landing'>
            <a href={
            'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' + "73024cba67cd4fa9b00ce451a3accb1f" +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent('http://localhost:3000/#/home')}>
                <button></button>
            </a>
        </div>
    )
}
