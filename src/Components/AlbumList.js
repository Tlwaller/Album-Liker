import React, { useState } from 'react'

export default function Albumlist(props) {
    const [albums, setAlbums] = useState(props.albums);

    return (
        <div>
            <ul>
                {
                    console.log(albums),
                    albums.map((e, i) => {
                        return (
                        <li key={i} className="album">
                            <img src={e.album.images[1].url} width="150"/>
                            <h1>{e.album.name}</h1>
                        </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
