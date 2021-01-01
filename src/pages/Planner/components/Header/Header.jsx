import React from 'react';
import { useAuth } from '../../../../contexts/AuthContexts';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(
    (theme) => ({

        header: {
            paddingTop: '5%'
        },

        button: {
            position: 'absolute',
            top: '6.3%',
            right: '5%'
        }
    })
)

export default function Header() {
    const classes = useStyles();
    const { logout } = useAuth();

    return (
        <div className={classes.header}>
            <IconButton className={classes.button} onClick={logout}>
                <ExitToAppIcon />
            </IconButton>
        </div>
    )
}