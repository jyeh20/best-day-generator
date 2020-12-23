import React, { useState } from 'react';
import firebase from '../../../firebase/firebase';

import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

var db = firebase.firestore();

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
        }

    })
)

export default function Input(props) {
    const classes = useStyles();

    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [description, setDescription] = useState("");
    const [items, setItems] = useState([]);


    // Handlers

    const handleNameChange = (name) => {
        setEventName(name.target.value);
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


    // On Submit

    const submitForm = () => {
        if (eventName.trim() === "") {
            console.log("eventName is empty")
            return;
        }
        db.collection(props.uid).doc(eventName).set({
            name: eventName,
            startTime: startTime,
            endTime: endTime,
            description: description
        })
        console.log(eventName);
    }




    return (
        <div className={classes.inputFieldLayout}>
            <Typography variant="h6">
                What do you want to get done tomorrow?
            </Typography>
            <div className={classes.taskName}>
                <TextField id="taskName" label="Task Name" variant="standard" fullWidth value={eventName} onChange={handleNameChange} />
            </div>
            <div className={classes.timeInput}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className={classes.timePickerPadding}>
                <KeyboardTimePicker id="startTime" value={startTime} onChange={handleStartTimeChange} className={classes.timePickerWidth}></KeyboardTimePicker>
                </div>
                <Typography> _ </Typography>
                <div className={classes.timePickerPadding}>
                <KeyboardTimePicker id="endTime" value={endTime} onChange={handleEndTimeChange} className={classes.timePickerWidth}></KeyboardTimePicker>
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
            <div className={classes.container}>
            <div className={classes.button}>
                <Button variant="contained">
                    <Typography>Cancel</Typography>
                </Button>
            </div>
            <div className={classes.button}>
                <Button variant="contained" color="primary" onClick={submitForm}>
                    <Typography>Submit</Typography>
                </Button>
            </div>
            </div>
        </div>
    )
}