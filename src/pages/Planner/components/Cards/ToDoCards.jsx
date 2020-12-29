import React, { useState } from 'react';
import firebase from '../../../../firebase/firebase';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CheckIcon from '@material-ui/icons/Check';
import Edit from '@material-ui/icons/Edit';
import ExpandMore from '@material-ui/icons/ExpandMore';

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

        expand: {
            alignSelf: 'flex-end',
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
        },

        colors: {
            color: '#FFFFFF'
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
        },

        cardActions: {
            display: 'flex',
            marginBottom: 'auto',
        }
    })
)
/**
 * Individual Card component for use on Planner parent component
 */
export default function ToDoCards(props) {
    const db = firebase.firestore();
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

    /**
     * handler for expanding for more details about an event
     */
    const handleExpandClick = () => {
    setExpanded(!expanded);
    };

    async function markDone() {

        try{
            setLoading(true);
            await db.collection(props.uid).doc(props.date).collection("tasks").doc(props.eventName)
            .update({
                completed: true
            })
        } catch {
            console.log('Failed to update completed')
        }
        setLoading(false);
    }

    return(
        <div className={classes.cardDiv}>
            <Card className={classes.card} >

                <CardContent className={classes.cardContent} className={classes.colors}>
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
                            startIcon={<CheckIcon />}
                            onClick={markDone}
                            disabled={loading}
                        >
                            Done
                        </Button>
                    </Typography>

                    <IconButton aria-label="edit">
                        <Edit className={classes.colors} />
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
        </div>
    )
}