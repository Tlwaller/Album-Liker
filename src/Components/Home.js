import React, { useState, useEffect } from 'react'
import AlbumList from './AlbumList';
import { record } from '../images/index';

export default function Home(props) {
    const [user, setUser] = useState({});
    const [albums, setAlbums] = useState();
    const token = props.location.state.token;

    const [paging, setPaging] = useState({});

    const handleNav = dir => {
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
            <h1>Welcome, {user.name}</h1>
            <AlbumList albums={albums}/>
            <nav className="al-nav">
                <button className="al-nav-btn" onClick={() => handleNav(paging.prev)}>Previous</button>
                <h1>{paging.current} / {Math.ceil(paging.total / paging.limit)}</h1>
                <button className="al-nav-btn" onClick={() => handleNav(paging.next)}>Next</button>
            </nav>
        </div>)
    )
}