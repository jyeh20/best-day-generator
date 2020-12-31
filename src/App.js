import React from 'react';

import { Container } from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContexts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute';

import Planner from './pages/Planner/Planner';
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
                    <Switch>
                        <PrivateRoute exact path="/" component = {Planner} />
                        <PrivateRoute path="/update-profile" component={UpdateProfile} />
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
