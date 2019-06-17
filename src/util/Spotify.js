const clientId = '621aad112b144a06a14fd6df54b260b1';
const redirectURI = `http://statuesque-grass.surge.sh/`;

let accessToken = localStorage.getItem('accessToken');
let expiresIn = localStorage.getItem('expiresIn');

window.onload = function (){
  console.log('for desktop -> this clears the local variables')
  localStorage.accessToken = '';
  localStorage.expiresIn = '';

}

document.addEventListener("deviceready", function() {
  console.log('for mobile -> this clears the local variables')
  localStorage.accessToken = '';
  localStorage.expiresIn = '';
}, false);

const Spotify = {
  // method to get access token
  getAccessToken() {
    // check for access token
    if (localStorage.accessToken.length > 1 && localStorage.expiresIn > 1) {
      // return access token if present
      return accessToken;
    }
    // if there is no access token but is present in window.location.href
    if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      // set access token value
      localStorage.accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      // set variable for expire time
      localStorage.expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      // clear the value for the expiration time
      window.setTimeout(() => accessToken = '', expiresIn * 3600);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      // redirect to authentication url
      window.location.href = encodeURI(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
    }
  },

  search(term) {
    let accessToken;
    //check length of accessToken.. return token greater than .length(1) else, getToken
    if(localStorage.accessToken.length>1){
      accessToken = localStorage.accessToken;
    }else{
      accessToken = this.getAccessToken();
    }
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }

    let token, headers, userId, playlistId;
    // get access token
    token = this.getAccessToken();
    // get userId
    headers = {Authorization: `Bearer ${token}`};
    // get user id
    return fetch(`https://api.spotify.com/v1/me`,{
       method: 'GET',
       headers: headers
      })
     .then(response => { return response.json()})
     .then(jsonResponse => {
        userId = jsonResponse.id;
      })
      // post a new playlist
      .then(() => {
        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
         method: 'POST',
         headers: headers,
         body: JSON.stringify({name: playlistName}),
         json: true
        })
       .then(response => { return response.json()})
       .then(jsonResponse => {
          playlistId = jsonResponse.id;
        })
        // post track URIs
        .then(() => {
          fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
           method: 'POST',
           headers: headers,
           body: JSON.stringify({uris: trackURIs}),
           json: true
          })
         .then(response => { return response.json()})
         .then(jsonResponse => {
            playlistId = jsonResponse.id;
          })
        })
      });
  }
}

export default Spotify;
