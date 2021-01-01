import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import DatePicker from './components/DatePicker/DatePicker';
import { useAuth } from '../../contexts/AuthContexts';
import firebase from '../../firebase/firebase';

import { makeStyles } from '@material-ui/core/styles';
import ToDoCardContainer from './components/CardContainers/ToDoCardContainer';
import CompletedCardContainer from './components/CardContainers/CompletedCardContainer';


const useStyles = makeStyles(
    (theme) => ({
        default: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%',
            minWidth: '500px',
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

        text: {
            textAlign: 'center',
        },

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

        completedTasks: {
            display: 'flex',
            paddingTop: '40px',
            minWidth: '100%',
            margin: 'auto',
            flexDirection: 'column',
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
    const [uncompletedTasks, setUncompletedTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const { uid } = useAuth();
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Date to String method
    function dateToString(date) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dayNumber = date.getDate();
        let month = months[date.getMonth()];
        let day = days[date.getDay()];
        let year = date.getFullYear();

        return (day + dayNumber + "-" + month + "-" + year);
    }

    // Date Handler

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }



      // useEffect to fetch data
    useEffect(() => {
        const db = firebase.firestore();
        const collectionRef = db.collection(uid).doc(dateToString(selectedDate)).collection("tasks")

        function getCompleted() {
            collectionRef.where("completed", "==", true)
            .get()
            .then((tasks) => {
                const docData = tasks.docs;
                setCompletedTasks(docData);
            });

        }

        function getToDo() {
            collectionRef.where("completed", "==", false)
            .get()
            .then((tasks) => {
                const docData = tasks.docs;
                setUncompletedTasks(docData);
            });
        }

        async function getData() {
            getCompleted();
            getToDo();
        }
        collectionRef
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    getData();
                    console.log(change.doc.data().name + " has been added")
                }
                if (change.type === "modified") {
                    getData();
                    console.log(change.doc.data().name + " has been modified")
                }
                if (change.type === "removed") {
                    getData();
                    console.log(change.doc.data().name + " has been deleted")
                }
            });
        });
        getData();
        // eslint-disable-next-line
    }, [selectedDate, setSelectedDate])

    return(
        <div className={classes.default}>
            <Header />
            <DatePicker date={selectedDate} onChange={handleDateChange} />
            <ToDoCardContainer
                uid = {uid}
                date = {dateToString(selectedDate)}
                tasks = {uncompletedTasks}
                completed = {false}
            />
            <div className={classes.completedTasks}>
                <CompletedCardContainer
                    uid = {uid}
                    date = {dateToString(selectedDate)}
                    tasks = {completedTasks}
                    completed = {true}
                />
            </div>
        </div>
    )
}