import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(
    (theme) => ({
        datepicker: {
            paddingBottom: '20px',
        },
    })
)

/**
 * Utilizing Material UI picker API to choose which date we want to look at, edit, or switch to
 * @param {} props passing a date from Planner.jsx that can be changed in this child component
 */
export default function DatePicker(props) {
  const classes = useStyles();
  const handleDateChange = (date) => {
    props.onChange(date);
    console.log('props date: ' + props.date)
  };

  return (
    <div className={classes.datepicker}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Selected Date"
                format="MM/dd/yyyy" // add feature to change date formatting
                value={props.date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    </div>
  );
}