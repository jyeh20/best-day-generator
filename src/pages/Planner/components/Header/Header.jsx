import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(
    (theme) => ({
        container: {
            display: 'flex',
            margin: 'auto',
            paddingBottom: '20px',
        },

        text: {
            display: 'flex',
            margin: 'auto',
        },
    })
)

export default function Header() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography variant='h3'  className={classes.text}>
                How can Tomorrow be the best day possible?
            </Typography>
        </div>
    )
}