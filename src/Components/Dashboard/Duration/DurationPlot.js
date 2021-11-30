import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from '@mui/material';

import * as d3 from "d3";


import { useTheme, makeStyles } from '@mui/styles';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../../../Theme.js';


const useStyles = makeStyles((theme) => ({
    header: {
        color: '#F2F4F5',
    }

}));

function BarChart(data, {
    x = (d, i) => i, // given d in data, returns the (ordinal) x-value
    y = d => d, // given d in data, returns the (quantitative) y-value
    title, // given d in data, returns the title text
    marginTop = 20, // the top margin, in pixels
    marginRight = 0, // the right margin, in pixels
    marginBottom = 30, // the bottom margin, in pixels
    marginLeft = 40, // the left margin, in pixels
    width = 640, // the outer width of the chart, in pixels
    height = 400, // the outer height of the chart, in pixels
    xDomain, // an array of (ordinal) x-values
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // y-scale type
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    xPadding = 0.1, // amount of x-range to reserve to separate bars
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor" // bar fill color
    } = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
  
    // Compute default domains, and unique the x-domain.
    if (xDomain === undefined) xDomain = X;
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    xDomain = new d3.InternSet(xDomain);
  
    // Omit any data not present in the x-domain.
    const I = d3.range(X.length).filter(i => xDomain.has(X[i]));
  
    // Construct scales, axes, and formats.
    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);
  
    // Compute titles.
    if (title === undefined) {
      const formatValue = yScale.tickFormat(100, yFormat);
      title = i => `${X[i]}\n${formatValue(Y[i])}`;
    } else {
      const O = d3.map(data, d => d);
      const T = title;
      title = i => T(O[i], i, data);
    }
  
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));
  
    const bar = svg.append("g")
            .attr("fill", color)
        .selectAll("rect")
        .data(I)
        .join("rect")
            .attr("x", i => xScale(X[i]))
            .attr("y", i => yScale(Y[i]))
            .attr("height", i => yScale(0) - yScale(Y[i]))
            .attr("width", xScale.bandwidth());
  
    if (title) bar.append("title")
        .text(title);
  
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);
  
    return svg.node();
}

function DurationPlot(props) {
	// const theme = useTheme();
	const classes = useStyles(theme);

    const [durationData, setDurationData] = useState([]);


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
        const n = 6;
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


    function debug() {
        console.log('here')
        console.log(durationData);
        // console.log(this.state)
    }

	return (
		<React.Fragment>
        <ThemeProvider theme={theme}>
            <Container>
                <Typography className={classes.header}>Duration Plot</Typography>
                <Button variant='contained' onClick={debug}>debugger</Button>
            </Container>
        </ThemeProvider>
		</React.Fragment>
	);


}

export default DurationPlot;