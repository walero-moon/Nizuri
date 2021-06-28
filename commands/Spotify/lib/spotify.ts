import { clientID, clientSecret, errColour, successColour } from '../../../config.json';
const SpotifyWebApi = require('spotify-web-api-node')

const spotify = new SpotifyWebApi({
    clientId: clientID,
    clientSecret: clientSecret,
});

// Retrieve an access token
spotify.clientCredentialsGrant().then(
    function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotify.setAccessToken(data.body['access_token']);
    },
    function (err) {
        console.log(
            'Something went wrong when retrieving an access token',
            err.message
        );
    }
);


export { spotify }