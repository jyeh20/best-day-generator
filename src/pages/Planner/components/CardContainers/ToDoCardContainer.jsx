import React, { useState } from 'react';
import NewTask from './NewTask/NewTask';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ToDoCards from '../Cards/ToDoCards';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import AddCircle from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(
    (theme) => ({
        paperSchedule: {
            display: 'flex',
            paddingTop: '40px',
            width: '70%',
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

        addButton: {
            marginLeft: 'auto',
            paddingRight: '50px',
            paddingBottom: '30px',
        },
    })
)

export default function ToDoCardContainer(props) {
    const classes = useStyles();
    const [newTask, setNewTask] = useState(false);

    const handleNewTask = () => {
        setNewTask(!newTask)
        console.log(newTask)
    }

    return(
        <>
        {newTask ? <NewTask date={props.date} close={handleNewTask} newTask={newTask} /> : null}
        <Fade in={true} timeout={{enter: 2000}}>
            <Paper className={classes.paperSchedule}>
                <Typography variant="h5" className={classes.text}>To-Do</Typography>
                <div className={classes.cardStructure}>
                        <div className={classes.gridLayout}>
                        {(props.tasks.map((item) => (
                            <ToDoCards
                            uid = {props.uid}
                            date = {props.date}
                            taskName={item.data().name}
                            description={item.data().description}
                            startTime={item.data().startTime}
                            endTime={item.data().endTime}
                            startTimeAsDate={item.data().startTimeAsDate}
                            endTimeAsDate={item.data().endTimeAsDate}
                            color={item.data().color}
                            />
                        )))}
                        </div>
                </div>
                <div className={classes.addButton}>
                    <IconButton onClick={handleNewTask}>
                            <AddCircle />
                    </IconButton>
                </div>
            </Paper>
        </Fade>
        </>
    )
}