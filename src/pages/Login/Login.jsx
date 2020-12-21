import firebase from '../../firebase/firebase';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

var provider = new firebase.auth.GoogleAuthProvider();

const useStyles = makeStyles (
    (theme) => ({
        button: {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '40vh'
        }
    })
)

export default function Login() {
    const classes = useStyles();

    function login() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // TODO: Route to Planner
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            console.log(errorCode);
            console.log(errorMessage);
            console.log(email);
            console.log(credential);
          });
    }

    return(
        <div className={classes.button}>
            <Button variant="contained" color="primary" onClick={login}>
                <Typography >
                Login with Google
                </Typography>
            </Button>
        </div>
    )
}