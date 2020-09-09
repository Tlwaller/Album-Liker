import React from "react";
import { record, heart, spotificon } from '../images/index';

export default function Guestlanding(props) {
    return (
        <div className='guest-landing'>
            <h1>Album Liker</h1>
            <div className='gl-images'>
                <img src={ record } alt='albums' height='165px'/>
                <img src={ heart } alt='heart' height='155px'/>
            </div>
            <h2>Add all songs from your liked albums to your liked songs!</h2>
            <a href='http://localhost:8888/login'>
                <button className='gl-btn'><img src={ spotificon } alt='spotify' height='60%'/>Let's go!</button>
            </a>
        </div>
    )
}
