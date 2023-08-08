import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NoLivesRemaining({ isOpen }) {

    const handleClose = () => {
        // Handle close logic here if needed
    };

    const handleWatchAdd = () => {
        // Handle logic to redirect to Google Ads watching service
        window.open('https://www.google.com/ads/', '_blank');
        console.log('User clicked "Watch an add"');
        sessionStorage.setItem('lifes',2);
        window.location.reload()
        handleClose();
    };

    const handleViewPremiumPacks = () => {
        // Handle logic to show premium packs or navigate to subscription page
        console.log('User clicked "View premium packs"');
        handleClose();
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"No more lives?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        You have no more lives. To get 2 lives, watch an ad or subscribe to premium plans.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleWatchAdd}>Watch an ad</Button>
                    <Button onClick={handleViewPremiumPacks}>View premium packs</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

NoLivesRemaining.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};
