import React, { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TitleIcon from '@mui/icons-material/Title';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Form} from "react-bootstrap";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import SearchPage from './searchPage.component'
import UserSessionNavBar from "./usersessionnavbar.component";
import NavBar from "./navbar.component";
import { Checkbox } from "@mui/material";


const drawerWidth = 250;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
  
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
  
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



// Our home page is going to be the persistent left drawer by itself
export default function PersistentDrawerLeft(){
  const  userSessionNavbar = (localStorage.getItem('loginNavbar') !== null) ? (JSON.parse(localStorage.getItem('loginNavbar'))) : (null);

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('');
  const [filterValue, setFilterValue] = useState({filterChosen:""})
  const [checked, setChecked] = useState(false);

  const handleDrawerOpen = () => {
      setOpen(true);
  };

  const handleDrawerClose = () => {
      setOpen(false);
  };


  const handleChange = (event, nextView) => {
    // Update the state
    setFilterValue({filterChosen: nextView})
    //reset the checked option
    if(filterValue.filterChosen !== "searchPrice"){
      setChecked(false);
    }
    setView(nextView);
    console.log(nextView);
  };

  //If user selects free books
  const handleFreeBooks = (event) => {
    setChecked(!checked)

      if(checked === true){
        setFilterValue({filterChosen: ""})
      }else{
        setFilterValue({filterChosen: "searchFree"})
      }
  }

  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar style={{backgroundColor:'#000000'}}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
            <MenuIcon />
            </IconButton>
                { ( userSessionNavbar !== null && userSessionNavbar.flag === true) ? (<UserSessionNavBar/>) : (<NavBar/>)}
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
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>

            <Divider />

            {/* Thee list of buttons on the left hand nav bar used for filtering data */}
            <ToggleButtonGroup
                orientation="vertical"
                value={view}
                exclusive
                fullWidth = "true"
                size="large"
                onChange={handleChange}
              >
              <ToggleButton value="searchCategory" aria-label="category" >
                <div style={{display:'flex', width:'150px', justifyContent:'left'}}>
                  
                  <div style={{float:'left', justifyContent:'flex-start'}}>
                    <ListAltIcon />
                  </div>
                  
                  <div style={{marginLeft:'15px'}}>
                    Category
                  </div>
                
                </div>

              </ToggleButton>

              <ToggleButton value="searchTitle" aria-label="title">
              <div style={{display:'flex', width:'150px',justifyContent:'left'}}>
                  <div style={{float:'left',  justifyContent:'flex-start'}}>
                    <TitleIcon />
                  </div>
                  <div style={{marginLeft:'15px'}}>
                    Title
                  </div>
                </div>
              </ToggleButton>

              <ToggleButton value="searchAuthor" aria-label="author">
              <div style={{display:'flex', width:'150px', justifyContent:'left'}}>
                  <div style={{float:'left', justifyContent:'flex-start'}}>
                    <BorderColorIcon />
                  </div>
                  <div style={{marginLeft:'15px'}}>
                    Author
                  </div>
                </div>
              </ToggleButton>

              <ToggleButton value="" aria-label="price">
              <div style={{display:'flex', width:'150px',justifyContent:'left'}}>
                  <div style={{float:'left', justifyContent:'flex-start'}}>
                    <MonetizationOnIcon />
                  </div>
                  <div style={{marginLeft:'15px'}}>
                    Price
                  </div>
                </div>
              </ToggleButton>

              </ToggleButtonGroup>

            <div>
              { (filterValue.filterChosen === "searchPrice" || filterValue.filterChosen === "searchFree" || filterValue.filterChosen === "") && (
                  <Form className="d-flex" style={{display: 'inline-block'}}>
                  {/* <FormGroup controlId="formInlineMin">*/}
                  {/*    <FormLabel>Min Price</FormLabel>{' '}*/}
                  {/*    <FormControl*/}
                  {/*        type="number"*/}
                  {/*        min = {0}*/}
                  {/*        placeholder="0"*/}
                  {/*        value={this.state.minPrice}*/}
                  {/*        onChange={this.handleMinPrice}/>*/}
                  {/*</FormGroup>{' '}*/}
                  {/*-*/}
                  {/*<FormGroup controlId="formInlineMax">*/}
                  {/*    <FormLabel>Max Price</FormLabel>{' '}*/}
                  {/*    <FormControl*/}
                  {/*        type="number"*/}
                  {/*        placeholder="500"*/}
                  {/*        value={this.state.maxPrice}*/}
                  {/*        onChange={this.handleMaxPrice}/>*/}
                  {/*</FormGroup>{' '} */}
            
                  <Form.Check
                      className="big-checkbox"
                      type = "checkbox"
                      id = "freeBook-checkbox"
                      value="searchFree"
                      label = "Free books"
                      onChange={handleFreeBooks}
                  />
                </Form>
              )}
            </div>

        {/* <List>

        {['Category', 'Title', 'Author', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
            <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
            </ListItem>
        ))}
        </List>
        
        <Divider />

        <List>
        {['Price'].map((text, index) => (
            <ListItem button key={text}>
            <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
            </ListItem>
        ))}
        </List> */}
        </Drawer>

        <Main open={open}>
                <SearchPage filterChosen={filterValue.filterChosen} />
        </Main>
    </Box>
  
  );
}
