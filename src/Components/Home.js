import React, { useState, useEffect } from 'react'

export default function Home(props) {
    const [user, setUser] = useState({});
    
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
            })})
    },[props]);

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
        </div>
    )
}