import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(
    (theme) => ({
        container: {
            display: 'flex',
            flexDirection: 'row'
        },
        button: {
            padding: '10px'
        }
    })
)

export default function Submit() {
    const classes = useStyles();
    return(
        <div className={classes.container}>
            <div className={classes.button}>
                <Button variant="contained">
                    <Typography>Cancel</Typography>
                </Button>
            </div>
            <div className={classes.button}>
                <Button variant="contained" color="primary">
                    <Typography>Submit</Typography>
                </Button>
            </div>
        </div>
    )
}