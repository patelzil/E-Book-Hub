import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Chip} from "@mui/material";
import { BsArrowLeftSquare, BsFillPersonFill, BsFillPeopleFill } from "react-icons/bs";
import {Button, ButtonToolbar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import ChatRoom from "./ChatRoom.component";


const drawerWidth = 350;

export default function ChatInfo(props) {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar style={{color:"#FFFFFF", background: "linear-gradient(to right, #304352, #d7d2cc)", height: "5vh"}}>

                    <Typography variant="h6">
                        {/* The club title goes here */}
                        {props.bookClub.bookclubName}
                    </Typography>

                </Toolbar>
            </AppBar>

            <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
            >
                <Toolbar>
                    <ButtonToolbar>
                        <Button className="button" size="lg" onClick={() => navigate('/bookClubs')}> <h2> <BsArrowLeftSquare/>  BACK </h2></Button>
                    </ButtonToolbar>
                </Toolbar>

                <Divider>
                    <Chip label="CLUB DESCRIPTION" />
                </Divider>

                <div style={{padding:"5px" , textAlign:"Left"}}>
                    <Typography paragraph>
                        {/* Render the club info */}
                        {props.bookClub.info}
                    </Typography>
                </div>


                <Divider>
                    <Chip label="HOST" />
                </Divider>

                <div>
                    <Typography variant="h4" style={{padding:"5px" , textAlign:"Center"}}>
                        {/* Render the club HOST - who is always index 0 of the users group */}
                        <div>   <BsFillPersonFill/> </div>
                        {props.bookClub.Users[0]}
                    </Typography>
                </div>

                <Divider>
                    <Chip label="MEMBERS" />
                </Divider>

                <div style={{padding:"5px" , textAlign:"Center"}}>
                    <Typography variant="h4">
                        <BsFillPeopleFill/>
                    </Typography>

                    <List style={{textAlign:"Center"}}>
                        {/* Render the list of users of the book club */}
                        { props.bookClub.Users.map((user) => (
                            <ListItem dense={false} divider={true} style={{textAlign:"center" }}>
                                <ListItemText primary={user} />
                            </ListItem>
                        ))}
                    </List>

                </div>


            </Drawer>

            <div style={{width: "100%", height: "92vh", marginBottom: "0px"}}>
                <ChatRoom bookClub={props.bookClub}/>
            </div>
        </Box>
  );
}

// The following component was adapter from mui
