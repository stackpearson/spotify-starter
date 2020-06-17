import React, { useEffect, useState } from 'react'
import Spotify from 'spotify-web-api-js';
import axios from 'axios';

const spotifyWebApi = new Spotify();


function Playlists (props) {
    // console.log(props.getHashParams)
    const [playLists, setPlaylists] = useState();
    const playlistNames = []

    useEffect(() => {

        

        const accessToken = props.getHashParams.access_token;
        spotifyWebApi.setAccessToken(accessToken) 

        spotifyWebApi.getUserPlaylists('sawyerpearson1992')
        .then((response) => {
          console.log('get playlist', response.items)
          setPlaylists(response.items)
  
        })
        
  
        spotifyWebApi.getPlaylistTracks('74Va1e92OjOrPfrfG35Ark')
          .then((response) => {
            console.log(response.items[0].track)
          })

    }, [])


    return(
        <p>playLists</p>
    )
}

export default Playlists;