import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../../contexts/AuthContexts';
import firebase from '../../../../firebase/firebase'

import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import CompletedCards from '../Cards/CompletedCards';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import AddCircle from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(
    (theme) => ({
        completedPaper: {
            display: 'flex',
            paddingTop: '10px',
            paddingBottom: '5%',
            minWidth: '50%',
            maxWidth: '70%',
            margin: 'auto',
            flexDirection: 'column',
            elevation: 4,
            backgroundColor: '#f5f5f5',
        },

        text: {
            textAlign: 'center',
        },

        cardStructure: {
            display: 'flex',
            margin: 'auto',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },

        gridLayout: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
        },
    })
)

export default function CompletedCardContainer(props) {
    const classes = useStyles();

    return(
        <Fade in={true} timeout={{enter: 2000}}>
        <Paper className={classes.completedPaper}>
                <Typography variant="h5" className={classes.text}>Completed</Typography>
                <div className={classes.cardStructure}>
                    <Fade in={true} timeout={{enter: 4000}}>
                        <div className={classes.gridLayout}>
                            {props.tasks.map((item) => (
                                <CompletedCards
                                uid = {props.uid}
                                date = {props.date}
                                eventName={item.data().name}
                                description={item.data().description}
                                startTime={item.data().startTime}
                                endTime={item.data().endTime}
                                />
                            ))}
                        </div>
                    </Fade>
                </div>
            </Paper>
            </Fade>
    )
}