import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { GithubPicker } from 'react-color';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(
    (theme) => ({
        layout: {
            marginTop: '3%',
            display: 'flex',
            backgroundColor: 'white',
            alignSelf: 'center',
            width: '15%',
            border: '1px solid black',
            justifyContent: 'center',
            borderRadius: '5px',
            paddingTop: '1%',
            paddingBottom: '1%',
            marginBottom: '1%',
            minWidth: '80px',
            minHeight: '20px',
        },

        paper: {
            margin: 'auto',
            width: '90%',
        },

        picker: {
            margin: 'auto',
            minWidth:'40px'
        }

    })
)

export default function ColorPicker(props) {
    const classes = useStyles();
    const [togglePicker, setTogglePicker] = useState(false);

    const handleTogglePicker = () => {
        setTogglePicker(!togglePicker);
    }

    return(
        <>
        <div className={classes.layout}>
            <Button className={classes.paper} style={{backgroundColor: props.color}} onClick={handleTogglePicker} />
        </div>
        {togglePicker ? <GithubPicker
        className={classes.picker}
        colors={['#ed2f00',
        '#ff7d00',
        '#f0b000',
        '#1273de',
        '#4a68ff',
        '#5300eb'
        ]}
        triangle={null}
        width={'30%'}
        onChange={props.handleColorChange}
        onChangeComplete={handleTogglePicker}
        />
        : null}
        </>
    )
}