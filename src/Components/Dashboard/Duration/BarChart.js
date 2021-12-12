import React, { useState, useEffect, useMemo } from 'react';
import { Card, Container, Typography, Button } from '@mui/material';
import { letterFrequency } from '@visx/mock-data';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { LegendOrdinal } from '@visx/legend';
import { localPoint } from '@visx/event';
import { Grid } from '@visx/grid';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { SeriesPoint } from '@visx/shape/lib/types';


function BarChart(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const propsData = props.data;
        setData(propsData);
	}, [props.data]);

    if (data == undefined) {
        return (
            <Card>
                <Typography>Loading...</Typography>
            </Card>
        )
    } else {

        // dimensions
        const width = 500;
        const height = 500;
        const margin = { top: 20, bottom: 20, left: 5, right: 5 };

        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        // defining our data
        const x = d => d.readableLabel;
        const y = d => +d.frequency * 100;

        // scaling by data
        const xScale = scaleBand({
            range: [0, xMax],
            round: true,
            domain: data.map(x),
            padding: 0.4,
        });
        const yScale = scaleLinear({
            range: [yMax, 0],
            round: true,
            domain: [0, Math.max(...data.map(y))],
        });

        // pointer functions
        const compose = (scale, accessor) => data => scale(accessor(data));
        const xPoint = compose(xScale, x);
        const yPoint = compose(yScale, y);



        return (
            <svg width={width} height={height}>
            {data.map((d, i) => {
                const barHeight = yMax - yPoint(d);
                return (
                        <Group key={`bar-${i}`}>
                            <Bar
                            x={xPoint(d)}
                            y={yMax - barHeight}
                            height={barHeight}
                            width={xScale.bandwidth()}
                            fill="#fc2e1c"
                            id={i}
                            onMouseEnter={props.startHoverIndex}
                            onMouseLeave={props.endHoverIndex}
                            />
                            {/* <AxisLeft scale={yScale} label="Times Expressed" /> */}
                            <AxisBottom 
                            scale={xScale} 
                            label="Song Lengths" 
                            stroke="#a44afe" 
                            tickStroke="#a44afe"
                            tickLabelProps={(value, index) => ({
                                transform: 'rotate(90 ' + xScale(value) + ',0)',
                                fill: "#a44afe",
                                fontSize: 11,
                                textAnchor: 'middle',
                            })} 
                            labelOffset={15} 
                            top={yMax} />
                        </Group>
                );
            })}
            </svg>
        );
        }
}

export default BarChart;