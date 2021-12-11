import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Card, Box, Grid } from '@mui/material';

import BarChart from './BarChart.js';
import SongListTimes from "./SongListTimes.js";

import { useTheme, makeStyles } from '@mui/styles';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../../../Theme.js';


const useStyles = makeStyles((theme) => ({
    header: {
        color: '#F2F4F5',
    }

}));

function DurationPlot(props) {
	// const theme = useTheme();
	const classes = useStyles(theme);

    const [durationData, setDurationData] = useState([]);
    const [activeDataIndex, setActiveDataIndex] = useState(-1);

    useEffect(() => {
        let fifty = props.userTopFiftyTracks;
        console.log(fifty);

        function getData() {
            fifty.sort(function(a, b){return a.duration - b.duration});

            if (fifty.length != 0) {
                var tracksInBuckets = setBuckets(fifty);
            }

            setDurationData(tracksInBuckets);
        }
        getData();
	}, [props.userTopFiftyTracks]);
    console.log(durationData);

    function setBuckets(sortedTracks) {
        const n = 8;
        const minDuration = sortedTracks[0]['duration'];
        const maxDuration = sortedTracks[sortedTracks.length - 1]['duration'];
        const bucketSize = (maxDuration - minDuration) / n;

        var buckets = []
        var bucketMin = minDuration - 1;
        var tracksCounter = 0;

        // looping through to sort tracks into n buckets
        // also creating the buckets here
        for (var i = 0; i < n; i++ ) {
        
            var bucketMax = Math.floor(bucketMin + bucketSize);
            if (i == n-1) {
                bucketMax = maxDuration;
            }

            var bucketTracks = [];

            // looping through the tracks to place them in
            // their respective buckets
            for (var j=0; j < sortedTracks.length; j++) {
                j = tracksCounter;

                let t = sortedTracks[j]['duration'];

                if (t > bucketMin && t <= bucketMax) {
                    bucketTracks.push(sortedTracks[j]);
                    ++tracksCounter;
                } else {
                    // break;
                    j = sortedTracks.length + 1;
                }
            }

            var bucket = {
                label: `${bucketMin} - ${bucketMax}`,
                min: bucketMin,
                max: bucketMax,
                frequency: (bucketTracks.length / sortedTracks.length),
                tracks: bucketTracks
            }
            buckets.push(bucket);

            // updating the minBucket size
            // should this be a linked list??
            bucketMin = bucketMax;
        }
        return (buckets);
    }

    function startHoverIndex(event) {
        var i = event.target.id;
        console.log('entering' + i)
        setActiveDataIndex(i)
    }

    function endHoverIndex(event) {
        var i = event.target.id
        console.log("leaving" + i)
        // setActiveDataIndex(-1)
    }


    function debug() {
        console.log('here')
        console.log(durationData);
        // console.log(this.state)
    }

  

	return (
		<React.Fragment>
        <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Card>
                        <Typography className={classes.header}>Duration Plot</Typography>
                        {/* <Button variant='contained' onClick={debug}>debugger</Button> */}
                        <BarChart data={durationData} startHoverIndex={startHoverIndex} endHoverIndex={endHoverIndex}></BarChart>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <SongListTimes data={durationData} activeIndex={activeDataIndex}></SongListTimes>
                </Grid>
            </Grid>
        </ThemeProvider>
		</React.Fragment>
	);


}

export default DurationPlot;