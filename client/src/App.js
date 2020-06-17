import React, { useState, useEffect } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import Playlists from './Playlists';

const spotifyWebApi = new Spotify();

function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}





function App(){

  const [artist, setArtist] = useState([]);
  const [album, setAlbum] = useState([]);
  const [song, setSong] = useState([]);
  const [image, setImage] = useState([]);
  

  useEffect(() => {

    const params = getHashParams();
    spotifyWebApi.setAccessToken(params.access_token);

    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        // console.log(response.item.album.images[0].url)
        setArtist(response.item.album.artists[0])
        setAlbum(response.item.album)
        setSong(response.item)
        setImage(response.item.album.images[0].url)
      })
 

  }, []);

  return (
    <div className="App">
      <a href='http://localhost:8888'>
        <button>Login with Spotify</button>
      </a>
      <div>
        <h2>Currently Playing</h2>
        <ul>
          <li>Artist: {artist.name} </li>
          <li>Album: {album.name} </li>
          <li>Song: {song.name}</li>
          {/* <li>Song: {test.name}</li> */}
        </ul>
        <div className="img-container">
          <img className='album-artwork' src={image} />
        </div>
          
  
        
         
      </div>
      <button >
        Retrieve Song: 
      </button>
      <div>
        <Playlists getHashParams={getHashParams()}/>
      </div>
    </div>
  )}

  // onClick={getSong()}


export default App;
