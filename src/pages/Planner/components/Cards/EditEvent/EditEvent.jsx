import React, { useState } from 'react'

import Input from './Input';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';


const useStyles = makeStyles (
    (theme) => ({
        modal: {
            position: 'fixed',
            zIndex: 1,
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
        },

        paper: {
            backgroundColor: '#e3f1fc',
            position: 'absolute',
            top:'30%',
            left: '30%',
            width: '40%',
            padding: '20px',
            borderRadius: '5px',
            minWidth: '300px',
            zIndex: 2,
        },

        button: {
            position: 'absolute',
            right: '0px'
        },

        close: {
            colors: 'black',
            float: 'right',
            fontSize: 'small',
        },


    })
)

export default function EditEvent(props) {
    const classes = useStyles();
    const [opened, setOpened] = useState(props.editEvent);

    const handleClose = () => {
        setOpened(false);
    }

    return (
        <>
        <div className={classes.modal} onClick={handleClose}>
        </div>
        <Zoom in={opened} timeout={{enter: 500, exit: 500}} onExited={props.close}>
            <Paper className={classes.paper}>
                <Input {...props} uid={props.uid} date={props.date} closeEdit={handleClose} />
            </Paper>
        </Zoom>
        </>
      );
}