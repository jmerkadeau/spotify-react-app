import React, { useState, useEffect, useMemo } from 'react';
import { Card, Container, Typography, Button } from '@mui/material';
import { letterFrequency } from '@visx/mock-data';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { Tooltip, useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { LegendOrdinal } from '@visx/legend';
import { localPoint } from '@visx/event';
import { Grid } from '@visx/grid';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { SeriesPoint } from '@visx/shape/lib/types';
import { min } from 'd3';
import { ClassNames } from '@emotion/react';


function BarChart(props) {
    const [data, setData] = useState([]);
    const [hoveredId, setHoveredId] = useState(null);
    const [clickedId, setClickedId] = useState(null);


    useEffect(() => {
        const propsData = props.data;
        setData(propsData);
	}, [props.data]);

    const {
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
        hideTooltip,
        showTooltip
    } = useTooltip();

    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        detectBounds: true,
        // when tooltip containers are scrolled, this will correctly update the Tooltip position
        scroll: true,
    });

    if (data == undefined) {
        return (
            <Card>
                <Typography>Loading...</Typography>
            </Card>
        )
    } 
    else {

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

        const boxWidth = xScale.bandwidth();
        const constrainedWidth = Math.min(40, boxWidth);

        // pointer functions
        const compose = (scale, accessor) => data => scale(accessor(data));
        const xPoint = compose(xScale, x);
        const yPoint = compose(yScale, y);

        function handleMouseEnter(event) {
            props.changeTitle(event);
            setHoveredId(event.target.id);
        };

        function handleMouseLeave(event) {
            props.clearTitle(event);
            setHoveredId(null);
        }

        function handleClick(event) {
            props.setClickIndex(event);
            setClickedId(event.target.id);
        }



        // showTooltip({
        //     tooltipTop: yScale(min(d)) ?? 0 + 40,
        //     tooltipLeft: xScale(x(d)) + constrainedWidth + 5,
        //     tooltipData: {
        //         min: min(d),
        //         name: x(d)
        //     }
        // })

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
                            fill = {hoveredId && (i == hoveredId) ? '#26580F' : '#FFFFFF'}
                            fillOpacity = {clickedId && (i == clickedId) ? 1 : 0.7}
                            // stroke = '#FFF200'
                            // strokeWidth = {clickedId && (i == clickedId) ? 4 : 0}
                            id={i}
                            onClick={handleClick}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            // onMouseEnter={props.changeTitle}
                            // onMouseLeave={props.clearTitle}
                            // onMouseLeave={props.endHoverIndex}
                            />
                            {/* <AxisLeft scale={yScale} label="Times Expressed" /> */}
                            <AxisBottom 
                            scale={xScale} 
                            label="Song Lengths" 
                            stroke="#a44afe" 
                            tickStroke="#a44afe"
                            tickLabelProps={(value, index) => ({
                                // transform: 'rotate(90 ' + xScale(value) + ',0)',
                                fill: "#a44afe",
                                fontSize: 8,
                                textAnchor: 'middle',
                            })} 
                            labelProps={{
                                fontSize: 11,
                                fill: '#ffffff',
                                x: (xMax - width + 25)
                              }}

                            // labelOffset={15} 
                            top={yMax} />
                        </Group>
                );
            })}
            </svg>
        );
    }
}

export default BarChart;