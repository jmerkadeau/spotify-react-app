import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Card, Box, Grid } from '@mui/material';

import BarChart from './BarChart.js';
import SongListTimes from "./SongListTimes.js";
import { msToReadableTime } from "../../../Functions/TimeFunctions.js";

import { useTheme, makeStyles } from '@mui/styles';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../../../Theme.js';


const useStyles = makeStyles((theme) => ({
    header: {
        color: '#F2F4F5',
    },
    plotTitle: {
        color: '#F2F4F5'
    },
    fullCard: {
        backgroundColor: '#383f4e'
    }

}));

function DurationPlot(props) {
	// const theme = useTheme();
	const classes = useStyles(theme);

    const [durationData, setDurationData] = useState([]);
    const [activeDataIndex, setActiveDataIndex] = useState(-1);
    const [plotTitle, setPlotTitle] = useState("...");

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

            const bucketMinTime = msToReadableTime(bucketMin);
            const bucketMaxTime = msToReadableTime(bucketMax);
            var bucket = {
                label: `${bucketMin} - ${bucketMax}`,
                readableLabel: `${bucketMinTime} - ${bucketMaxTime}`,
                min: bucketMin,
                max: bucketMax,
                minReadable: bucketMinTime,
                maxReadable: bucketMaxTime,
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

    function setClickIndex(event) {
        var i = event.target.id;
        console.log('entering' + i)
        setActiveDataIndex(i)
    }

    function endHoverIndex(event) {
        var i = event.target.id;
        console.log("leaving" + i)
        // setActiveDataIndex(-1)
    }

    function changeTitle(event) {
        var i = event.target.id;
        var bucket = durationData[i];
        var freq = Math.floor(bucket.frequency * 100);
        setPlotTitle(`${freq}% of your songs are between ${bucket.minReadable} and ${bucket.maxReadable}`);
    }

    function clearTitle(event) {
        setPlotTitle('...');
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
                    <Card className = {classes.fullCard}>
                        <Typography className={classes.header}>Duration Plot</Typography>
                        <Typography className={classes.plotTitle}>{plotTitle}</Typography>
                        {/* <Button variant='contained' onClick={debug}>debugger</Button> */}
                        <BarChart data={durationData} setClickIndex={setClickIndex} endHoverIndex={endHoverIndex} changeTitle={changeTitle} clearTitle={clearTitle}></BarChart>
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