import React, { useState } from 'react';
import './App.css';
import Routes from './Routes';

function App() {
  const [auth, setAuth] = useState(false);
  const client_id = process.env.CLIENT_ID;
  const scopes = 'user-read-private user-read-email';

  return (
    <div className="App">
      {Routes}
    </div>
  );
}

export default App;
