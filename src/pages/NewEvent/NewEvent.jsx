import React, { useState } from 'react';

import Input from './components/Input';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles (
    (theme) => ({
        pageLayout: {
            display: 'flex',
            justifyContent: 'center',
        },

        container: {
            display: 'flex',
            paddingTop: '5%',
            minWidth: '40%',
        },

        paperLayout: {
            display: 'flex',
            justifyContent: 'center',
            minWidth: '100%',
            minHeight: '70vh',

        },


    })
)

export default function NewEvent(props) {
    const classes = useStyles();


    return(
        <div className={classes.pageLayout}>
            <div className={classes.container}>
                <Paper className={classes.paperLayout}>
                    <div>
                        <Input uid={props.uid} />
                    </div>
                </Paper>
            </div>
        </div>
    )
}