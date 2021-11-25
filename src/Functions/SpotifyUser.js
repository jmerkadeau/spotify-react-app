import React from 'react';
import * as $ from "jquery";

// function that gets the current spotify user id
function getUser(token){
    $.ajax({
      url: "    https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(data) {
            var userInfo = {
                'displayName':  data.display_name,
                'photoUrl': data.images[0].url,
                'uid': data.id
            }
            console.log(userInfo)
            return (userInfo)
        }
        else{
            console.log('no data')
            return (false);
        }

      }
    });
}

export {
    getUser
}