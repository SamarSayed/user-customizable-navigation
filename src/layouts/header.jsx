'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import logo from "../images/logo.png"
import Image from 'next/image'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import WorkIcon from '@mui/icons-material/Work';

export default function SideBar() {

  return (
    <AppBar position="static" style={{ backgroundColor: "#161616" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image src={logo} width={100} alt='logo'/>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          </Box>

          <Box sx={{ flexGrow: 0, padding: "15px 30px 0 0" }}>
            <IconButton sx={{ p: 0, mr: "80px", color: "white", fontSize: "12px" }}>
              <span>
                <CottageOutlinedIcon />
                <p>Home</p>
              </span>
            </IconButton>
            <IconButton sx={{ p: 0 , color: "white", fontSize: "12px"}}>
              <span>
                <WorkIcon />
                <p>Jobs</p>
              </span>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
