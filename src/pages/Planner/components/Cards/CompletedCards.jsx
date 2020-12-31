import React, { useState } from 'react';
import firebase from '../../../../firebase/firebase';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Fade from '@material-ui/core/Fade';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import UndoIcon from '@material-ui/icons/Undo';
import Edit from '@material-ui/icons/Edit';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(
    (theme) => ({
        card: {
            maxWidth: '300px',
            minWidth: '200px',
            margin:'auto',
            alignItems: 'center',
            backgroundColor:"#4a68ff",
        },

        cardDiv: {
            padding: '20px',
        },

        colors: {
            color: '#FFFFFF',
        },

        column: {
            display: 'flex',
            flexDirection: 'column',
        },

        expand: {
            alignSelf: 'flex-end',
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
        },

        expandOpen: {
            transform: 'rotate(180deg)',
        },

        height: {
            maxHeight: '50px',
            overflow: 'scroll',
        },

        cardContent: {
            display: 'flex',
            margin: 'auto',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#FFFFFF'
        },

        cardActions: {
            display: 'flex',
            marginBottom: 'auto',
        },

    })
)
/**
 * Individual Card component for use on Planner parent component
 */
export default function ToDoCards(props) {
    const db = firebase.firestore();
    const docRef = db.collection(props.uid).doc(props.date).collection("tasks").doc(props.eventName)
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);


    /**
     * handler for expanding for more details about an event
     */
    const handleExpandClick = () => {
    setExpanded(!expanded);
    };


    const handleDelete = () => {
        let toDelete = window.confirm("Are you sure you want to delete this task?");
        if (toDelete) {
            setDeleted(true);
        }
    };


    async function toDo() {
        try {
            setLoading(true);
            await docRef
            .update({
                completed: false
            })
        } catch {
            console.log('Failed to update to do')
        }
        setLoading(false);
    }

    async function removeTask() {
        try {
            setLoading(true);
            await docRef
            .delete()
        } catch {
            setDeleted(false);
            console.log('Failed to delete task')
        }
        setLoading(false);
    }

    return(
        <div className={classes.cardDiv}>
            <Fade in = {deleted===false} timeout={{enter: 500, exit:500}} onExited={removeTask}>
            <Card className={classes.card} >

                <CardContent className={classes.cardContent}>
                    <Typography>
                        {props.eventName}
                    </Typography>
                    <Typography>
                        {props.startTime} - {props.endTime}
                    </Typography>
                </CardContent>


                <CardActions disableSpacing className={classes.cardActions}>
                    <Typography>
                        <Button
                            variant="contained"
                            color="#4a68ff"
                            className={classes.button}
                            startIcon={<UndoIcon />}
                            onClick={toDo}
                            disabled={loading}
                        >
                            To-Do
                        </Button>
                    </Typography>

                    <IconButton aria-label="edit">
                        <Edit className={classes.colors} />
                    </IconButton>

                    <IconButton
                        aria-label="delete"
                        onClick={handleDelete}
                    >
                        <DeleteIcon className={classes.colors} />
                    </IconButton>

                    <IconButton
                        className={classes.expand, {
                            [classes.expandOpen]: expanded,
                            }}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                        aria-label="expand"
                    >
                        <ExpandMore className={classes.colors} />
                    </IconButton>

                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className={classes.height}>
                        <Typography paragraph className={classes.colors}>
                            {props.description}
                        </Typography>
                    </CardContent>
                </Collapse>

            </Card>
            </Fade>
        </div>
    )
}