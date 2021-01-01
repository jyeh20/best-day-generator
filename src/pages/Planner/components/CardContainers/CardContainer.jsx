import React, { useState } from 'react';
import NewTask from './NewTask/NewTask';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ContainerContent from './ContainerContent';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles(
    (theme) => ({
        paperSchedule: {
            display: 'flex',
            paddingTop: '40px',
            minWidth: '400px',
            width: '100%',
            margin: 'auto',
            flexDirection: 'column',
            elevation: 4,
            backgroundColor: '#f5f5f5',
        },

        completedPaper: {
            display: 'flex',
            paddingTop: '10px',
            paddingBottom: '5%',
            minWidth: '400px',
            width: '100%',
            margin: 'auto',
            flexDirection: 'column',
            elevation: 4,
            backgroundColor: '#f5f5f5',
            minHeight: '150px',
            marginBottom: '5%'
        },
    })
)

export default function CardContainer(props) {
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
            {props.toDoContainer ?
            <Paper className={classes.paperSchedule}>
                <ContainerContent {...props} handleNewTask={handleNewTask} />
            </Paper>
            :
            <Paper className={classes.completedPaper}>
                <ContainerContent {...props} />
            </Paper>
            }
        </Fade>
        </>
    )
}