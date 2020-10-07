import React from 'react'

export default function Home(props) {
    console.log("access token: ", props.location.state.token);
    return (
        <div>
            <h1>Welcome Home</h1>
        </div>
    )
}
