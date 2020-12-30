import React from 'react'

import Input from './Input';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles (
    (theme) => ({
        modal: {
            position: 'fixed',
            zIndex: 1,
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.10)',
        },

        paper: {
            backgroundColor: 'white',
            position: 'absolute',
            top:'40%',
            left: '30%',
            width: '40%',
            padding: '20px',
            borderRadius: '5px',
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
    console.log(props)
    const classes = useStyles();

    const handleClose = () => {
        props.close()
    }

    return (
        <div className={classes.modal}>
          <Paper className={classes.paper}>
              <Button className={classes.button} onClick={handleClose}>
                  <CloseIcon className={classes.close}/>
              </Button>
              <div>
                <Input {...props} uid={props.uid} date={props.date} />
              </div>
          </Paper>
        </div>
      );
}