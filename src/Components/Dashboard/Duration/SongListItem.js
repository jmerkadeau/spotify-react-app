import React, { useState, useEffect, useMemo } from 'react';
import { Card, Container, Typography, Button, 
    List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { active } from 'd3';


function SongListItem(props) {

    return(
        <ListItem key={props.id} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={props.name} src={props.coverArt} />
        </ListItemAvatar>
        <ListItemText primary={props.name + ' - ' + props.duration} secondary={props.artist} />
        </ListItem>
    )
}

export default SongListItem;