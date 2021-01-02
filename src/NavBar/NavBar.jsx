import React from 'react';

import { useAuth } from '../contexts/AuthContexts';
import { Navbar, Nav } from 'react-bootstrap';

export default function NavBar() {
    const { currentUser } = useAuth();
    return (
        <>
        {currentUser ?
        <Navbar bg="light" variant="light">
            <Nav.Link href="/">Planner</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/suggestions">Suggestions</Nav.Link>
        </Navbar>
        :
        null
        }
        </>
    )
}