import React, { useState, useEffect } from 'react'
import AlbumList from './AlbumList';
import { record } from '../images/index';
import { Button } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

export default function Home(props) {
    const [user, setUser] = useState({});
    const [albums, setAlbums] = useState();
    const [checkTracks, setCheckTracks] = useState();
    const token = props.location.state.token;

    const [paging, setPaging] = useState({});
    
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    const wait = debounce(() => setCheckTracks('true'), 1500);

    const handleNav = dir => {
        setCheckTracks('false')
        fetch(dir, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(res => res.json())
        .then(data => {
            setAlbums(data.items);

            setPaging({
                limit: data.limit,
                current: data.offset / data.limit + 1,
                prev: data.previous,
                next: data.next,
                total: data.total
            })
        });
    }
    
    useEffect(() => {
        //declare token in effect to remove warning
        const token = props.location.state.token;

        //set the user data
        fetch("https://api.spotify.com/v1/me", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
            country: data.country,
            name: data.display_name,
            email: data.email,
            explicit_content: data.explicit_content,
            external_urls: data.external_urls,
            followers: data.followers,
            href: data.href,
            id: data.id,
            images: data.images,
            product: data.product,
            type: data.type,
            uri: data.uri
            })});

        //set initial paging and list of albums
        fetch("https://api.spotify.com/v1/me/albums?offset=0&limit=20", {
        headers: { "Authorization": "Bearer " + token }
        })
        .then(res => res.json())
        .then(data => {
            setAlbums(data.items);
            setPaging({
                limit: data.limit,
                current: data.offset / data.limit + 1,
                prev: data.previous,
                next: data.next,
                total: data.total
            })
        });
    },[props,]);
    
    return(!albums
        ? <img src={ record } alt="loading-record" className="loading-record"/>
        :
        (<div id="home-container">
            <h1>Welcome, {user.name}. {checkTracks}</h1>
            <AlbumList albums={albums} checkTracks={checkTracks}/>
            <nav className="al-nav">
                <Button 
                className={(paging.current === 1) ? "" : "al-nav-btn"}
                color={(paging.current === 1) ? "secondary" : "primary"}
                size="small" onClick={() => handleNav(paging.prev)}
                disabled={(paging.current === 1) ? true : false}>
                    <KeyboardArrowLeft />
                    <h1>Back</h1>
                </Button>

                <h1 onChange={wait}>{paging.current} / {Math.ceil(paging.total / paging.limit)}</h1>

                <Button
                className={(paging.current === (Math.ceil(paging.total / paging.limit))) ? "" : "al-nav-btn"}
                color={(paging.current === (Math.ceil(paging.total / paging.limit))) ? "secondary" : "primary"}
                size="small" onClick={() => {handleNav(paging.next);wait()}}
                disabled={(paging.current === (Math.ceil(paging.total / paging.limit))) ? true : false}>
                    <h1>Next</h1>
                    <KeyboardArrowRight />
                </Button>


            </nav>
        </div>)
    )
}