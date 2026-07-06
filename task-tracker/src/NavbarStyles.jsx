import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { SignUp } from './SignUp';
import { LogIn } from './LogIn';


function NavbarStyles({ setCurrentView, isLoggedIn, setIsLoggedIn }) {

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userFullName");
        setIsLoggedIn(false);
        setCurrentView("login");
    };

    return (
        <>
            <div className='nav-bar-main'>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            Task Tracker
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <div className='log-option'>
                                {isLoggedIn ? (
                                    <Button variant="contained" onClick={handleLogout}>Log Out</Button>
                                ) : (
                                    <>
                                        <Button variant="contained" onClick={() => setCurrentView("signup")}>Sign Up</Button>
                                        <Button variant="contained" onClick={() => setCurrentView("login")}>Login</Button>
                                    </>
                                )}

                            </div>


                        </Box>
                    </Toolbar>
                </AppBar>

            </div>
        </>
    )
}
export { NavbarStyles };