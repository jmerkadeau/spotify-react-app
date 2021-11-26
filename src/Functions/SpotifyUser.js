import React from 'react';
import * as $ from "jquery";

// function that gets the current spotify user id
async function getSpotifyUser(token){
    const userInfo = await $.ajax({
      url: "    https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(data) {
            console.log('there is data')
        }
        else{
            console.log('no data')
        }

      }
    });
    var returnVal = {
        displayName:  userInfo.display_name,
        coverArt: userInfo.images[0].url,
        id: userInfo.id,
        followers: userInfo.followers.total,
        href: userInfo.href,
    }
    return returnVal;
}

async function getTopItems(token, type="tracks", time_range="short_term", limit=50, offset=0) {
    const returnArray = await $.ajax({
        url: `https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=${limit}&offset=${offset}`,
        type: "GET",
        beforeSend: xhr => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function(data){
          // Checks if the data is not empty
          if(data) {
              console.log('there is data :)');
          }
          else{
              console.log('no data :(')
          }
  
        }
    });
    var returnVal = []
    for (var i in returnArray.items){
        const item = returnArray.items[i];
        // console.log(item);

        const itemDetails = (type === 'tracks') ? getTrackDetails(item) : getArtistDetails(item);
        returnVal.push(itemDetails);
    }    
    return(returnVal)

}
function getTrackDetails(track) {
    var artists = [];
    for (var i in track.artists) {
        const artistInfo = {
            name: track.artists[i].name,
            id: track.artists[i].id
        }
        artists.push(artistInfo)
    }

    const returnVal = {
        name: track.name,
        id: track.id,
        // uri: track.uri,
        album: track.album.name,
        albumId: track.album.id,
        // albumUri: track.album.uri,
        coverArt: track.album.images[0],
        artists: artists,
        duration: track.duration_ms,
        popularity: track.popularity,

    }
    return returnVal;

}

function getArtistDetails(artist) {
    const returnVal = {
        name: artist.name,
        id: artist.id,
        popularity: artist.popularity,
        genres: artist.genres,
        followers: artist.followers.total,
        popularity: artist.popularity,
        coverArt: artist.images[0],
    }
    return returnVal;
}

export {
    getSpotifyUser, getTopItems
}