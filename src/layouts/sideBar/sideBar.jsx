'use client'

import * as React from 'react';
import SideBarList from './sideBarList';
import { Dialog, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SegmentIcon from '@mui/icons-material/Segment';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

export default function SideBar() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className='sideBar'>
            <div className='d-md-block d-none'>
                <SideBarList />
            </div>
            <div className='d-md-none' style={{textAlign: "center"}}>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClickOpen}
                    aria-label="close"
                    style={{width: "100%", textAlign:"center", backgroundColor:"#e4e3e3", borderRadius:"5px"}}
                >
                    <span style={{margin: "auto"}}>Companies</span>
                    <SegmentIcon style={{marginLeft: "auto"}} />
                </IconButton>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon style={{marginLeft: "auto"}} />
                    </IconButton>
                    <SideBarList />
                </Dialog>
            </div>
        </div>
    );
}