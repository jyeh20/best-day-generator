import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import firebase from '../../../../../firebase/firebase';

import { makeStyles } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { Button, Alert } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

let db = firebase.firestore();

const useStyles = makeStyles(
    (theme) => ({
        inputFieldLayout: {
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '15px',
        },

        taskName: {
            maxWidth: '200px',
            display: 'flex',
            flexDirection:'row',
            alignSelf:'center',
            paddingBottom: '30px',
        },

        text: {
            textAlign: 'center',
            paddingBottom: '10px'
        },

        timeInput: {
            display: 'flex',
            flexDirection: 'row',
            alignSelf:'center',
        },

        timePickerWidth: {
            maxWidth: '125px'
        },

        timePickerPadding: {
            padding: '10px'
        },

        descriptionField: {
            paddingTop: '30px',
        },

        container: {
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            paddingTop: '20px',
        },

        button: {
            padding: '10px'
        },

        dash: {
            paddingTop:'20px'
        }
    })
)

export default function Input(props) {
    const classes = useStyles();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [taskName, settaskName] = useState(props.taskName);
    const [startTime, setStartTime] = useState(props.startTimeAsDate.toDate());
    const [endTime, setEndTime] = useState(props.endTimeAsDate.toDate());
    const [description, setDescription] = useState(props.description);
    const [color, setColor] = useState(props.color);
    const collectionRef = db.collection(props.uid).doc(props.date).collection("tasks");

    function dateToString(date) {
        let hour = date.getHours();
        let minute = date.getMinutes();
        if (minute < 10) {
            minute = "0" + minute
        }
        if (minute === 0) {
            minute = "00"
        }
        let ampm = "am";
        if( hour > 12 ) {
            hour -= 12;
            ampm = "pm";
        }
        return (hour + ":" + minute + " " + ampm);
    }

    const handleNameChange = (name) => {
        setError('');
        settaskName(name.target.value);
    }

    const handleStartTimeChange = (time) => {
        setStartTime(time);
    };

    const handleEndTimeChange = (time) => {
        setEndTime(time);
    };

    const handleDescriptionChange = (descriptionValue) => {
        setDescription(descriptionValue.target.value)
    }

    const handleColorChange = (newColor) => {
        setColor(newColor.hex)
    }

    // Compare start/end times

    function compareTimes(start, end) {
        if (start > end) {
            return true
        }
    }

    // On Submit

    async function updateTask() {
        // handle a change in name
        if (taskName.localeCompare(props.taskName !== 0)) {
            collectionRef.doc(props.taskName
                ).delete().then(function() {
                    console.log("successfully deleted");
                }).catch(function (bug) {
                    console.log("error: ", bug)
                })
            return collectionRef.doc(taskName).set({
                name: taskName,
                startTime: dateToString(startTime),
                startTimeAsDate: startTime,
                endTimeAsDate: endTime,
                endTime: dateToString(endTime),
                description: description,
                color: color,
                date: props.date,
                completed: false
            }).then(function() {
                console.log("successfully updated");
            }).catch(function (bug) {
                console.log("error: ", bug)
            })
        }

        // handle changes to everything else
        else {
            return collectionRef.doc(props.taskName).update({
                name: taskName,
                startTime: dateToString(startTime),
                startTimeAsDate: startTime,
                endTimeAsDate: endTime,
                endTime: dateToString(endTime),
                description: description,
                color: color,
                date: props.date,
                completed: false
            }).then(function() {
                console.log("successfully updated");
            }).catch(function (bug) {
                console.log("error: ", bug)
            })
        }
    }

    function submitForm() {
        setLoading(true);
        if (taskName.trim() === "") {
            setError("Task Name is empty!")
            setLoading(false);
            return;
        }
        if (compareTimes(startTime, endTime)) {
            setError('Start Time should be before End Time!')
            setLoading(false);
            return;
        }
        try {
            setError('')
            updateTask();
        } catch {
            setError('Failed to add task, please try again!')
        }
        setLoading(false);
        props.closeEdit();
    }

    return (
        <div className={classes.inputFieldLayout}>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className={classes.taskName}>
                <TextField id="taskName" label="Task Name" defaultValue={taskName} variant="standard" fullWidth value={taskName} onChange={handleNameChange} />
            </div>
            <div className={classes.timeInput}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className={classes.timePickerPadding}>
                <KeyboardTimePicker id="startTime" label="Start Time" value={startTime} onChange={handleStartTimeChange} className={classes.timePickerWidth}></KeyboardTimePicker>
                </div>
                <Typography className={classes.dash}> _ </Typography>
                <div className={classes.timePickerPadding}>
                <KeyboardTimePicker id="endTime" label="End Time" value={endTime} onChange={handleEndTimeChange} className={classes.timePickerWidth}></KeyboardTimePicker>
                </div>
            </MuiPickersUtilsProvider>
            </div>
            <div className={classes.descriptionField}>
                <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    multiline
                    rows={6}
                    variant="outlined"
                />
            </div>
            <ColorPicker {...props} color={color} handleColorChange={handleColorChange} />
            <div className={classes.container}>
            <div className={classes.button}>
                <Button variant="light" onClick={props.cancelEdit}>
                    <Typography>Cancel</Typography>
                </Button>
            </div>
            <div className={classes.button}>
                <Button disabled={loading} type="submit" className="w-100" onClick={submitForm}>
                    <Typography>Submit</Typography>
                </Button>
            </div>
            </div>
        </div>
    )
}