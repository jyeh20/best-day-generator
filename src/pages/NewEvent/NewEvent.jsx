import React, { useState } from 'react';

import Input from './components/Input';
import { useAuth } from '../../contexts/AuthContexts';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles (
    (theme) => ({
        pageLayout: {
            display: 'flex',
            justifyContent: 'center',
            minWidth: '40%',
        },

        container: {
            display: 'flex',
            paddingTop: '15%',
            minWidth: '40%',
        },

        paperLayout: {
            display: 'flex',
            justifyContent: 'center',
            minWidth: '100%',
            minHeight: '50vh',
        },


    })
)

export default function NewEvent() {
    const { uid } = useAuth();
    const classes = useStyles();


    return(
        <div className={classes.pageLayout}>
            <div className={classes.container}>
                <Paper className={classes.paperLayout}>
                    <div>
                        <Input uid={uid} />
                    </div>
                </Paper>
            </div>
        </div>
    )
}