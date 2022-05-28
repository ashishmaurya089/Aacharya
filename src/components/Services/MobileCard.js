import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "none",
    height: "90%",
    borderRadius: 10,
    margin: "2px",
//     maxWidth: 125,
    // boxShadow: '0 0 10px 0 rgba(250, 169, 6, 0.2)',
    "&:hover": {
      boxShadow: "0 0 10px 0 rgba(255, 6, 6, 0.2)",
    },
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  media: {
    height: 60,
    width: 60,
    margin: "10px auto 0",
    backgroundSize: "contain",
  },
  segName: {
    fontSize: '2vh',
    fontWeight: 700,
    textAlign: "center",
    padding: theme.spacing(1),
  },
}));

export default function MobileCard({ data, type }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSelected = (id) => {
    dispatch({
      type: "SELECT_SEGMENT",
      payload: id,
    });
  };
  return (
    <Grid container justifyContent='center'>
      {data &&
        data.length > 0 &&
        data.map((seg) => (
          <Grid item xs={4} key={seg._id}>
            <Link to={type === "providerlevel" ? `/providerlevel` : `/levels`}>
              <Paper
                elevation={3}
                className={classes.root}
                onClick={() => handleSelected(seg._id)}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={seg.icon}
                    title={seg.name}
                  />

                  <Typography
                    gutterBottom
                    component="p"
                    className={classes.segName}
                  >
                    {seg.name}
                  </Typography>
                </CardActionArea>
              </Paper>
            </Link>
          </Grid>
        ))}
    </Grid>
  );
}
