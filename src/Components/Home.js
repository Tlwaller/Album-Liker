import React, { useState, useEffect } from 'react'
import AlbumList from './AlbumList';
import { record } from '../images/index';

export default function Home(props) {
    const [user, setUser] = useState({});
    const [albums, setAlbums] = useState();
    
    useEffect(() => {
        const token = props.location.state.token;
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

            fetch("https://api.spotify.com/v1/me/albums?offset=0&limit=50", {
            headers: { "Authorization": "Bearer " + token }
            })
            .then(res => res.json())
            .then(data => {
                setAlbums(data.items)
            });
    },[props]);
    
    return(!albums
        ? <img src={ record } alt="loading-record" className="loading-record"/>
        :
        (<div id="home-container">
            <h1>Welcome, {user.name}</h1>
            <AlbumList albums={albums}/>
        </div>)
    )
}