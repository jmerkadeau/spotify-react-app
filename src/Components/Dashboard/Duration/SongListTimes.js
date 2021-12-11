import React, { useState, useEffect, useMemo } from 'react';
import { Card, Container, Typography, Button, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { active } from 'd3';
import SongListItem from './SongListItem.js';

import { useTheme, makeStyles } from '@mui/styles';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../../../Theme.js';

const useStyles = makeStyles((theme) => ({
    header: {
        color: '#F2F4F5',
    },
    cardHeader: {
        color: '#F2F4F5'
    },
    fullCard: {
        overflow: 'scroll',
    }

}));


function SongListTimes(props) {
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeData, setActiveData] = useState([]);
    const [activeLabel, setActiveLabel] = useState("");

    const classes = useStyles(theme);


    useEffect(() => {
        const propsData = props.data;
        setData(propsData);

        const propsActiveIndex = props.activeIndex;
        setActiveIndex(propsActiveIndex);

        if (propsActiveIndex != -1) {
            setActiveLabel(propsData[propsActiveIndex].label)
            console.log(propsData[propsActiveIndex].label)

            setActiveData(propsData[propsActiveIndex].tracks);
            console.log(propsData[propsActiveIndex].tracks)
        }

        // console.log(data[activeIndex]);
        // setActiveData()
        
	}, [props.data, props.activeIndex]);





    if (activeIndex == -1 || data == undefined) {
        return (
            <Card>
                <Typography>Hover over the plot...</Typography>
            </Card>
        )
    } else {
        return (
            <Card className={classes.fullCard} sx={{ maxHeight: 530 }}>
                <Typography className={classes.cardHeader}>{activeLabel}</Typography>
                <List>
                    {activeData.map((track, idx) => {
                        return(<SongListItem id={track.id} name={track.name} artist={track.artists[0].name} duration={track.duration} coverArt={track.coverArt.url}></SongListItem>)
                    })}
                </List>
            </Card>


        );
        }
}

export default SongListTimes;