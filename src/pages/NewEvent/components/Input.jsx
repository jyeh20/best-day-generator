import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
        }

    })
)

export default function Input() {
    const classes = useStyles();
    return (
        <div className={classes.inputFieldLayout}>
            <Typography variant="h6">
                What do you want to get done tomorrow?
            </Typography>
            <div className={classes.taskName}>
                <TextField id="taskName" label="Task Name" variant="standard" fullWidth />
            </div>
            <div className={classes.timeInput}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className={classes.timePickerPadding}>
                <KeyboardTimePicker id="startTime" className={classes.timePickerWidth}></KeyboardTimePicker>
                </div>
                <Typography> _ </Typography>
                <div className={classes.timePickerPadding}>
                <KeyboardTimePicker id="endTime" className={classes.timePickerWidth}></KeyboardTimePicker>
                </div>
            </MuiPickersUtilsProvider>
            </div>
            <div className={classes.descriptionField}>
                <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    multiline
                    rows={6}
                    variant="outlined"
                />
            </div>
        </div>
    )
}