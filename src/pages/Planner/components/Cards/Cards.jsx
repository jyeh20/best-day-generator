import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(
    (theme) => ({
        card: {
            maxWidth: '200px',
            minWidth: '200px',
            minHeight: '200px',
            margin:'auto',
            alignItems: 'center',
            backgroundColor: '#4a68ff',
        },

        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
        },

        colors: {
            color: '#FFFFFF'
        },

        expandOpen: {
            transform: 'rotate(180deg)',
        },

        height: {
            maxHeight: '50px',
            overflow: 'scroll',
        },

        cardContent: {
            display: 'flex',
            margin: 'auto',
            flexDirection: 'column',
        },

        cardActions: {
            display: 'flex',
            marginBottom: 'auto',
        }
    })
)
/**
 * Individual Card component for use on Planner parent component
 */
export default function Cards(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    /**
     * handler for expanding for more details about an event
     */
    const handleExpandClick = () => {
    setExpanded(!expanded);
    };

    return(
        <Card className={classes.card} >

            <CardContent className={classes.cardContent} className={classes.colors}>
                <Typography>
                    Test Event
                </Typography>
                <Typography>
                    8:00am - 9:00am
                </Typography>
            </CardContent>

            <CardActions disableSpacing className={classes.cardActions}>

                <IconButton aria-label="delete">
                    <Delete className={classes.colors} />
                </IconButton>

                <IconButton aria-label="edit">
                    <Edit className={classes.colors} />
                </IconButton>

                <IconButton
                    className={classes.expand, {
                        [classes.expandOpen]: expanded,
                        }}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                    aria-label="expand"
                >
                    <ExpandMore className={classes.colors} />
                </IconButton>

            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.height}>
                    <Typography paragraph className={classes.colors}>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>
                </CardContent>
            </Collapse>

        </Card>
    )
}