import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContexts'

const useStyles = makeStyles(
    (theme) => ({
        mainLayout: {
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            paddingTop: '10%',

        },

        passwordReset: {
            display: 'flex',
            flexDirection: 'column',
            minWidth: '40%',
            maxWidth: '70%',
        },

    })
)

export default function ForgotPassword() {
    const classes = useStyles();
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to reset password')
        }

        setLoading(false)
    }

    return (
        <div className={classes.mainLayout}>
            <div className={classes.passwordReset}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">
                            Password Reset
                        </h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Button disabled={loading} type="submit" className="w-100">
                                Reset Password
                            </Button>
                        </Form>
                            <div className = "w-100 text-center mt-3">
                                <Link to="/login">Login</Link>
                            </div>
                    </Card.Body>
                </Card>
                <div className = "w-100 text-center mt-2">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
