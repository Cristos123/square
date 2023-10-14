import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function FlowTable() {
    const [flow, setFlow] = React.useState('all');
    const [duration, setDuration] = React.useState('today');
    const handleChange = (event) => {
        setFlow(event.target.value);
    };
    const handleDChange = (event) => {
        setDuration(event.target.value);
    };
    return (
        <div className='my-8'>
            <div className='flex justify-between'>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Flow</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={flow}
                        onChange={handleChange}
                        label="Flow"
                    >
                        {/* <MenuItem value="">
                    <em>None</em>
                </MenuItem> */}
                        <MenuItem value={"inflow"}>In Flow</MenuItem>
                        <MenuItem value={"outflow"}>Out Flow</MenuItem>
                        <MenuItem value={"all"}>All</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Duration</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={duration}
                        onChange={handleDChange}
                        label="Duration"
                    >
                        {/* <MenuItem value="">
                    <em>None</em>
                </MenuItem> */}
                        <MenuItem value={"today"}>Today</MenuItem>
                        <MenuItem value={"thisweek"}>This Week</MenuItem>
                        <MenuItem value={"thismonth"}>This Month</MenuItem>
                        <MenuItem value={"thisyear"}>This Year</MenuItem>
                        <MenuItem value={"custom"}>Custom</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="Daniel Funmiluyi" />
                    </ListItemAvatar>
                    <ListItemText primary="Daniel Funmiluyi" secondary="+2348166827347" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="Joshua Igba" />
                    </ListItemAvatar>
                    <ListItemText primary="Joshua Igba" secondary="+2348132067839" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="Bella Rosie" />
                    </ListItemAvatar>
                    <ListItemText primary="Bella Rosie" secondary="+2349065784903" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="Bella Rosie" />
                    </ListItemAvatar>
                    <ListItemText primary="Bella Rosie" secondary="+2349065784903" />
                </ListItem>
            </List></div>
    );
}