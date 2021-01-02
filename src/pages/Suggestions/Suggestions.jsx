import React, { useState } from 'react';
import firebase from '../../firebase/firebase';

import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
    (theme) => ({
        form: {
            paddingTop: '10%',
            margin: 'auto',
            minWidth: '200px',
            maxWidth: '80%'
        },

        button: {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '5%',
        }
    })
)

export default function Suggestions() {
    const classes = useStyles();
    const db = firebase.firestore();
    const collectionRef = db.collection("suggestions");
    const [email, setEmail] = useState("");
    const [suggestions, setSuggestions] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSuggestionsChange = (e) => {
        setSuggestions(e.target.value);
    }

    function submitForm() {
        setLoading(true)
        try{
            collectionRef.add({
            email: email,
            suggestions: suggestions
            })
        } catch {
            console.log("Failed to add suggestions")
        }
        history.push("/");
        setLoading(false);
    }


    return(
        <Form className={classes.form} onSubmit={submitForm}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} required />
            </Form.Group>
            <Form.Group controlId="suggestions">
                <Form.Label>Suggestions</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={handleSuggestionsChange} required />
            </Form.Group>

            <Button className={classes.button} disabled={loading} type="submit">Submit</Button>
        </Form>
    )
}