import React, { useState } from 'react';
import firebase from '../../../../firebase/firebase';

import EditEvent from './EditEvent/EditEvent';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CheckIcon from '@material-ui/icons/Check';
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

        },

        completedCard: {
            maxWidth: '300px',
            minWidth: '200px',
            margin:'auto',
            alignItems: 'center',
            backgroundColor:"#04a602",
        },

        cardDiv: {
            padding: '20px',
        },

        expand: {
            alignSelf: 'flex-end',
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
        },

        task: {
            textAlign: 'center',
            maxWidth: '80%',
            wordWrap: 'break-word'
        },

        colors: {
            color: '#FFFFFF'
        },

        description: {
            wordWrap: 'break-word',
            color: '#FFFFFF'
        },

        expandOpen: {
            transform: 'rotate(180deg)',
        },

        height: {
            maxHeight: '30vh',
            overflow: 'scroll',
        },

        cardContent: {
            display: 'flex',
            margin: 'auto',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#FFFFFF',
        },

        cardActions: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 'auto',
        }
    })
)
/**
 * Individual Card component for use on Planner parent component
 */
export default function Cards(props) {
    const db = firebase.firestore();
    const docRef = db.collection(props.uid).doc(props.date).collection("tasks").doc(props.taskName)
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [editEvent, setEditEvent] = useState(false);

    /**
     * handler for expanding for more details about an event
     */
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleEdit = () => {
        setEditEvent(!editEvent);
    }

    const handleDelete = () => {
        let toDelete = window.confirm("Are you sure you want to delete this task?");
        if (toDelete) {
            setDeleted(true);
        }
    };

    async function markDone() {
        try{
            setLoading(true);
            await docRef
            .update({
                completed: true
            })
        } catch {
            console.log('Failed to update completed')
        }
        setLoading(false);
    }

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

    function CardContents() {
        return (
            <>
                <CardContent className={classes.cardContent}>
                        <Typography className={classes.task}>
                            {props.taskName}
                        </Typography>
                        <Typography>
                            {props.startTime} - {props.endTime}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing className={classes.cardActions}>
                        {props.toDoCard ?
                            <Typography>
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#fafafa"}}
                                    className={classes.button}
                                    startIcon={<CheckIcon />}
                                    onClick={markDone}
                                    disabled={loading}
                                >
                                    Done
                                </Button>
                            </Typography>
                            :
                            <Typography>
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#f7f740"}}
                                    className={classes.button}
                                    startIcon={<UndoIcon />}
                                    onClick={toDo}
                                    disabled={loading}
                                >
                                    To-Do
                                </Button>
                            </Typography>
                        }


                    {props.toDoCard ?
                        <IconButton aria-label="edit"
                            onClick={handleEdit}
                            disabled={loading}
                        >
                            <Edit className={classes.colors} />
                        </IconButton>
                        :
                        null
                    }

                        <IconButton
                            aria-label="delete"
                            onClick={handleDelete}
                        >
                            <DeleteIcon className={classes.colors} />
                        </IconButton>

                        {props.description ?
                        <IconButton
                        // eslint-disable-next-line
                            className={classes.expand, {
                                [classes.expandOpen]: expanded,
                                }}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                            aria-label="expand"
                        >
                            <ExpandMore className={classes.colors} />
                        </IconButton>
                        : null }


                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent className={classes.height}>
                            <Typography paragraph className={classes.description}>
                                {props.description}
                            </Typography>
                        </CardContent>
                    </Collapse>
            </>
        )
    }

    return(
        <div className={classes.cardDiv}>
            {editEvent ? <EditEvent {...props} close={handleEdit} editEvent={editEvent}/> : null}
            <Fade in={deleted===false} timeout={{enter: 500, exit: 500}} onExited={removeTask}>
            {props.toDoCard ?
                <Card className={classes.card} style={{backgroundColor: props.color}}>
                    <CardContents />
                </Card>
            :
                <Card className={classes.completedCard}>
                    <CardContents />
                </Card>
            }
            </Fade>
        </div>
    )
}