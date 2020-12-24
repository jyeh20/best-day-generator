import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import DatePicker from './components/DatePicker/DatePicker';
import { useAuth } from '../../contexts/AuthContexts';
import firebase from '../../firebase/firebase';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Cards from './components/Cards/Cards';
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

        gridLayout: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
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
export default function Planner() {
    const [items, setItems] = useState([]);
    const { uid } = useAuth();
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const db = firebase.firestore();

    // Date to String method
    function dateToString(date) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let month = months[date.getMonth()];
        let day = days[date.getDay()];
        let year = date.getFullYear();

        return (day + "-" + month + "-" + year);
    }

    // Date Handler

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    // useEffect to fetch data

    useEffect(() => {
        db.collection(uid).doc(dateToString(selectedDate)).collection("tasks")
      .get()
      .then((tasks) => {
        const docData = tasks.docs;
        setItems(docData);
      });
      }, []);

    return(
        <div className={classes.default}>

            <Header />
            <DatePicker date={selectedDate} onChange={handleDateChange} />
            <Paper className={classes.paperSchedule}>
                <div className={classes.cardStructure}>
                    <Fade in={true} timeout={{enter: 4000}}>
                        <div className={classes.gridLayout}>
                            {items.map((item) => (
                                <Cards
                                eventName={item.data().name}
                                description={item.data().description}
                                startTime={item.data().startTime}
                                endTime={item.data().endTime}
                                />
                            ))}
                        </div>
                    </Fade>


                </div>
                <div className={classes.addButton}>
                    <Link to={`/add/${dateToString(selectedDate)}`}>
                        <IconButton>
                                <AddCircle />
                        </IconButton>
                    </Link>
                </div>
            </Paper>
        </div>
    )
}