import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(
    (theme) => ({
        header: {
            paddingTop: '15px',
            paddingBottom: '15px',
        },

        bottomParagraph: {
            paddingBottom: '15px',
        },
    })
)

export default function About() {
    const classes = useStyles();
    return(
        <>
            <Typography variant='h3' className={classes.header}>
                About
            </Typography>
            <Typography paragraph >
                I love my calendar. But a recurring problem that I have is that
                when tasks become monotonous and I have a repeating event (like
                working out oops 😳) I’ll skip it. “I’ll do it tomorrow,” I say…
                and then I say it again the next day… and the next day… you get
                the point.
            </Typography>
            <Typography paragraph>
                While I think that it is a great idea to have a week-by-week,
                month-by-month schedule for big picture things, what you accomplish
                on a day to day is a much more detailed process. When I’m planning
                my weeks on my calendar app on my phone, I have a habit of filling
                every free spot with something to do, and when that day comes I
                realize that I had forgotten to leave a spot open to eat lunch, or
                take into account a small travel time.
            </Typography>
            <Typography paragraph>
                My hope for Just Do It Tomorrow is that we can all take a
                little more time to plan our tasks day by day for the day
                we want. A big motivator for this idea comes from a lecture
                by Jordan Peterson, included at the bottom. I hope you
                enjoy using this planner, and let me know if you notice any
                bugs, or have suggestions for features!
            </Typography>
            <Typography paragraph className={classes.bottomParagraph}>
                Jonathan
            </Typography>
            <iframe
                width="600"
                height="400"
                src="https://www.youtube.com/embed/NLVUXbdqjUw"
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </>
    )
}