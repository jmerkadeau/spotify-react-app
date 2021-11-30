import React, { useState, useEffect } from 'react';
import { getSpotifyUser, getTopItems } from '../../Functions/SpotifyUser.js';
import * as $ from "jquery";
import { Container, Typography, Button } from '@mui/material';
import { BrowserRouter } from "react-router-dom";
import Home from './Home.js';
import DurationPlot from './Duration/DurationPlot.js';

function Main(props) {
    const [token, setToken] = useState(null);
    const [activePage, setActivePage] = useState('Home');



    // Data
    const [userData, setUserData] = useState({});
    const [userTopFiftyTracks, setUserTopFiftyTracks] = useState([]);
    const [userTopFiftyArtists, setUserTopFiftyArtists] = useState([]);






	useEffect(() => {
        setToken(props.token);
        async function getData(){
            if (token != null){
                const user = await getSpotifyUser(token);
                console.log(user);
                setUserData(user);
    
    
                const tracks = await getTopItems(token, 'tracks');
                setUserTopFiftyTracks(tracks);
    
                const artists = await getTopItems(token, 'artists');
                setUserTopFiftyArtists(artists);

            }
        }
        getData()
	}, [token]);

    function debugging() {
        console.log('here')
        console.log(userData);
        console.log(userTopFiftyTracks);
        console.log(userTopFiftyArtists);
        // console.log(this.state)
    }


    return(
        <React.Fragment>
            <Container className='container'>
                <Home userData={userData} userTopFiftyTracks={userTopFiftyTracks} userTopFiftyArtists={userTopFiftyArtists} />
                <DurationPlot userTopFiftyTracks={userTopFiftyTracks} />
            </Container>
        </React.Fragment>

    )
}

export default Main;