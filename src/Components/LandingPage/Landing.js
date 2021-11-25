import React, { useState, useEffect } from 'react';
import hash from './Hash.js';
import { authEndpoint, clientId, redirectUri, scopes } from "../../SpotifyConfig.js";
import Main from '../Dashboard/Main.js'

function Landing() {
    const [token, setToken] = useState(null);
    const [tokenExists, setTokenExists] = useState(false)

    useEffect(() => {

        function settingTheToken(){
            let _token = hash.access_token;
            if (_token) {
                console.log('exists')
              // Set token
                setToken(_token)
                setTokenExists(true);
            }
            else {
                console.log('does not exist')
            }
        }
        settingTheToken();
        console.log(tokenExists, token)

    }, [token])
    return (
        <div className="App">
        <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {tokenExists ? <Main token={token}/> : 
            <a
                className="btn btn--loginApp-link"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
            >
                Login to Spotify
            </a>
        }
        {/* {!token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )} */}
        {/* <p>landing page</p> */}
        {/* {this.state.token && (
          // Spotify Player Will Go Here In the Next Step
        )} */}
        </header>
      </div>
    );
  }
  
  export default Landing;

