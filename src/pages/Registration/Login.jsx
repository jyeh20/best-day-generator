import React, { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

import { makeStyles } from '@material-ui/core/styles';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContexts'
import ColoredLine from './components/ColoredLine';
import GoogleButton from 'react-google-button';

const useStyles = makeStyles(
    (theme) => ({
        mainLayout: {
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            paddingTop: '10%',
            paddingBottom: '7%',
        },

        login: {
            display: 'flex',
            flexDirection: 'column',
            minWidth: '300px',
            maxWidth: '80%',
        },

        formControl: {
            minWidth: '20vw'
        },

        card: {
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center'
        },

        googleButton: {
            paddingTop: '10px',
            alignSelf: 'center',
            paddingBottom: '10px',
        }

    })
)

export default function Login() {
    const { login, signinGoogle } = useAuth()
    const history = useHistory()
    const classes=useStyles()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to sign in')
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
        <div className={classes.mainLayout}>
            <div className={classes.login}>
                <Card>
                    <Card.Body className={classes.card}>
                        <h2 className="text-center mb-4">
                            Log In
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
                            <Button disabled={loading} type="submit" className="w-100">
                                Log In
                                </Button>
                        </Form>
                            <div className = "w-100 text-center mt-3">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </div>
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
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
        }
        </>
    )
}
