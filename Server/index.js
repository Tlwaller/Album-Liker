require("dotenv").config();
let express = require('express')
let request = require('request')
let querystring = require('querystring')

let app = express();

let redirect_uri =
  process.env.REDIRECT_URI ||
  'http://localhost:8888/callback'

app.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
});

app.get('/callback', (req, res) => {
    let code = req.query.code || null;
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(
                process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
        },
        json: true
    }
    request.post(authOptions, (error, response, body) => {
        var access_token = body.access_token;
        let uri = 'http://localhost:3000/home';
        res.redirect(uri + '?access_token=' + access_token);
    })
})

console.log(`Listening on port ${process.env.SERVER_PORT}. Go to /login to initiate authentication flow.`);
app.listen(process.env.SERVER_PORT);