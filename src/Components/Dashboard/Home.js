import React from "react";
import { Container, Typography, Button } from '@mui/material';

import { getSpotifyUser, getTopItems } from '../../Functions/SpotifyUser.js';

import { useTheme, makeStyles } from '@mui/styles';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../../Theme.js';


const useStyles = makeStyles((theme) => ({
    header: {
        color: '#F2F4F5',
    }

}));

function Home(props) {
	// const theme = useTheme();
	const classes = useStyles(theme);

    function debug() {
        console.log('here')
        console.log(props.userData);
        console.log(props.userTopFiftyTracks);
        console.log(props.userTopFiftyArtists);
        // console.log(this.state)
    }

	return (
		<React.Fragment>
        <ThemeProvider theme={theme}>
            <Container>
                <Typography className={classes.header}>logged in - home</Typography>
                <Button variant='contained' onClick={debug}>debugger</Button>
            </Container>
        </ThemeProvider>
		</React.Fragment>
	);


}

export default Home;