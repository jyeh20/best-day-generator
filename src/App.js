import React from 'react';

import { Container } from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContexts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute';

import NavBar from './NavBar/NavBar';
import About from './pages/About/About';
import Planner from './pages/Planner/Planner';
import Suggestions from './pages/Suggestions/Suggestions';
import SignUp from './pages/Registration/SignUp';
import Login from './pages/Registration/Login';
import ForgotPassword from './pages/Registration/ForgotPassword';
import UpdateProfile from './pages/Registration/UpdateProfile';

function App() {
  return (
    <Container>
        <div>
            <Router>
                <AuthProvider>
                    <NavBar />
                    <Switch>
                        <PrivateRoute exact path="/" component = {Planner} />
                        <PrivateRoute path="/update-profile" component={UpdateProfile} />
                        <PrivateRoute path="/suggestions" component = {Suggestions} />
                        <Route path="/about" component = {About} />
                        <Route path="/signup" component = {SignUp} />
                        <Route path="/login" component = {Login} />
                        <Route path="/forgot-password" component = {ForgotPassword} />
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    </Container>
  )
}

export default App;
