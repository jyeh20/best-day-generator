import React, { useState } from 'react';

import Input from './components/Input';
import Submit from './components/Submit';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles (
    (theme) => ({
        pageLayout: {
            display: 'flex',
            justifyContent: 'center',
        },

        container: {
            display: 'flex',
            paddingTop: '5%',
            minWidth: '40%',
        },

        paperLayout: {
            display: 'flex',
            justifyContent: 'center',
            minWidth: '100%',
            minHeight: '70vh',

        },

        submitContainer: {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '50px',
        }

    })
)

export default function NewEvent() {
    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");
    const [itemValue, setItemValue] = useState("");

    const addItems = event => {
        event.preventDefault();
        setItems([
            ...items,
            {
                name: itemName,
                value: itemValue
            }
        ]);
        setItemName("");
        setItemValue("");
    }

    return(
        <div className={classes.pageLayout}>
            <div className={classes.container}>
                <Paper className={classes.paperLayout}>
                    <div>
                    <Input />
                    <div className={classes.submitContainer}>
                    <Submit />
                    </div>
                    </div>
                </Paper>
            </div>
        </div>
    )
}