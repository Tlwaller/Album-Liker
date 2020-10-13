import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Albumlist(props) {
    const [albums, setAlbums] = useState(props.albums);

    return (
        <ol id="album-list-container">
            <desc>
                {/* <div className="album-desc-space"></div> */}
                <h2 className="desc desc-title">Album</h2>
                <h2 className="desc desc-artist">Artist</h2>
                <h2 className="desc desc-date">Date Liked</h2>
            </desc>
            {
                albums.map((e, i) => {
                    const dateAdded = new Date(e.added_at)
                    return (
                    <li key={i} className="album" id={`album-${i}`}>
                        <Link to="/#" className="album-link-wrapper">
                            <img alt="album-cover" src={e.album.images[2].url} className="album-cover"/>
                            <h2 className="album-title">{e.album.name}</h2> 
                            <h2 className="album-artist">{e.album.artists[0].name}</h2>
                            <h2 className="album-date">{`${dateAdded.getFullYear()}-${("0" + (dateAdded.getMonth()+1)).slice(-2)}-${("0" + (dateAdded.getDate())).slice(-2)}`}</h2>
                        </Link>
                    </li>
                    )
                })
            }
        </ol>
    )
}
