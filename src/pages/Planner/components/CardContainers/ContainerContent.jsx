import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Cards from '../Cards/Cards';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';


const useStyles = makeStyles(
    (theme) => ({
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

export default function ContainerContent(props) {
    const classes = useStyles();

    return (
        <>
        {props.toDoContainer ?
            <>
            <Typography variant="h5" className={classes.text}>To-Do</Typography>
            <div className={classes.cardStructure}>
                    <div className={classes.gridLayout}>
                    {(props.tasks.map((item) => (
                        <Cards
                        toDoCard = {true}
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
                <IconButton onClick={props.handleNewTask}>
                        <AddCircle />
                </IconButton>
            </div>
            </>
        :
            <>
            <Typography variant="h5" className={classes.text}>Completed</Typography>
            <div className={classes.cardStructure}>
                    <div className={classes.gridLayout}>
                    {(props.tasks.map((item) => (
                        <Cards
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
            </>
        }



        </>
    )
}