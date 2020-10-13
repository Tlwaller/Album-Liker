import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Albumlist(props) {
    const [albums, setAlbums] = useState(props.albums);

    return (
        <ol id="album-list-container">
            <dl>
                <dt className="dt-title">Title</dt>
                <dt className="dt-artist">Artist</dt>
                <dt className="dt-date">Date Liked</dt>
            </dl>
            {
                albums.map((e, i) => {
                    return (
                    <li key={i} className="album">
                        <Link to="/#" className="album-link-wrapper">
                            <img alt="album-cover" src={e.album.images[2].url} className="album-cover" width="64" height="64"/>
                            <h1 className="album-title">{e.album.name}</h1>
                        </Link>
                    </li>
                    )
                })
            }
        </ol>
    )
}
