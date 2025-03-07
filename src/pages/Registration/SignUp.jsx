import React, { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase/firebase';

import { makeStyles } from '@material-ui/core/styles';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContexts';
import ColoredLine from './components/ColoredLine';
import GoogleButton from 'react-google-button';

const useStyles = makeStyles(
    (theme) => ({
        cardDiv: {
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            paddingTop: '10%',
            paddingBottom: '7%',
        },

        signUp: {
            display: 'flex',
            flexDirection: 'column',
            minWidth: '300px',
            maxWidth: '80%',
        },

        card: {
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center'
        },

        formControl: {
            minWidth: '20vw'
        },

        googleButton: {
            paddingTop: '3%',
            alignSelf: 'center',
            paddingBottom: '3%',
        }
    })
)

export default function SignUp() {
    const classes = useStyles()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, signinGoogle } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
    }

    async function handleGoogle(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await signinGoogle()
        } catch {
            setError('Failed to sign in')
        }

        setLoading(false)
    }

    useEffect(() => {
        auth
        .getRedirectResult()
        .then((result) => {
            if (result.credential) {
                history.push('/')
            } else {
                setLoading(false);
            }
        }).catch((authError) => {
            console.log("Not logged in with Google ", authError)
        });
    }, [])

    return (
        <>
        {loading ? null :
        <div className={classes.cardDiv}>
            <div className={classes.signUp}>
                <Card>
                    <Card.Body className={classes.card}>
                        <h2 className="text-center mb-4">
                            Sign Up
                        </h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className={classes.formControl} type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className={classes.formControl} type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control className={classes.formControl} type="password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button disabled={loading} type="submit" className="w-100">
                                Sign up
                                </Button>
                        </Form>
                            <div className = "w-100 text-center mt-3">
                                <ColoredLine color="gray"/>
                                or
                            </div>
                            <div  className={classes.googleButton}>
                                <GoogleButton onClick={handleGoogle} />
                            </div>
                    </Card.Body>
                </Card>
                <div className = "w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
        }
        </>
    )
}
