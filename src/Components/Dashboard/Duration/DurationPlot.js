import React from "react";
import { Container, Typography, Button } from '@mui/material';
import { useTheme, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        color: '#ff7961',
    }

}));


function DurationPlot() {
	const theme = useTheme();
	const classes = useStyles(theme);

	return (
		<React.Fragment>
            <Container className='container'>
                <Typography className='header'>Duration Plot Page</Typography>
            </Container>
		</React.Fragment>
	);


}

export default DurationPlot;