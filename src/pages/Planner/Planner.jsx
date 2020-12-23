import React, { useState } from 'react';
import Header from './components/Header/Header';
import DatePicker from './components/DatePicker/DatePicker';

import { makeStyles } from '@material-ui/core/styles';
import Card from './components/Cards/Cards';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import AddCircle from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(
    (theme) => ({
        default: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%'
        },

        paperSchedule: {
            display: 'flex',
            paddingTop: '40px',
            minWidth: '50%',
            maxWidth: '70%',
            margin: 'auto',
            flexDirection: 'column',
            elevation: 4,
            backgroundColor: '#f5f5f5',
        },

        cardStructure: {
            display: 'flex',
            margin: 'auto',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },

        cardDiv: {
            padding: '20px',
        },

        expand: {
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

        addButton: {
            marginLeft: 'auto',
            paddingRight: '50px',
            paddingBottom: '30px',
        },
    })
)
/**
 * Main page of the application, where we can edit/delete/add events to our schedule
 */
export default function Planner(props) {
    console.log(props)
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    
    return(
        <div className={classes.default}>

            <Header />
            <DatePicker date={selectedDate} onChange={handleDateChange} />
            <Paper className={classes.paperSchedule}>
                <div className={classes.cardStructure}>
                    <Fade in={true} timeout={{enter: 2000}}>
                        <div className={classes.cardDiv}>
                            <Card />
                        </div>
                    </Fade>
                    <Fade in={true} timeout={{enter: 2000}}>
                        <div className={classes.cardDiv}>
                            <Card />
                        </div>
                    </Fade>
                    <Fade in={true} timeout={{enter: 2000}}>
                        <div className={classes.cardDiv}>
                            <Card />
                        </div>
                    </Fade>
                    <Fade in={true} timeout={{enter: 2000}}>
                        <div className={classes.cardDiv}>
                            <Card />
                        </div>
                    </Fade>
                    <Fade in={true} timeout={{enter: 2000}}>
                        <div className={classes.cardDiv}>
                            <Card />
                        </div>
                    </Fade>
                    <Fade in={true} timeout={{enter: 2000}}>
                        <div className={classes.cardDiv}>
                            <Card />
                        </div>
                    </Fade>

                </div>
                <div className={classes.addButton}>
                    <IconButton>
                        <AddCircle />
                    </IconButton>
                </div>
            </Paper>
        </div>
    )
}