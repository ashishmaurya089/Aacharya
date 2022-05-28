import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CustomBreadCrumbs from "../../components/CustomBreadCrumbs";
import { Box, Container, Grid, Paper } from "@material-ui/core";
import ProgressBar from "../../components/ProgressBar";
import { findTutorBySubject } from "../../actions/tutorActions";
import NoItemsFound from "../../components/NoItemsFound";
import { Link } from "react-router-dom";
import TutorFilter from "../../components/TutorFilter";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px auto",
    padding: "10px 10px",
    width: "100%",
    borderRadius: 10,
    // backgroundColor: theme.palette.background.paper,
  },
  providerAvatar: {
    height: 100,
    width: 100,
    [theme.breakpoints.down("sm")]: {
      height: 75,
      width: 75,
    },
  },
  inline: {
    display: "inline",
  },
  listContent: {
    marginLeft: 30,
    "& > span": {
      fontSize: 26,
      fontWeight: 600,
    },
  },
  listDetails: {
    display: "flex",
    justifyContent: "space-between",
  },
  listDegree: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "& > span": {
      margin: "3px 0",
      fontSize: 16,
    },
  },
  listReview: {
    textAlign: "center",
  },
  listRating: {
    fontSize: 18,
  },
  listAvgRating: {
    fontSize: 20,
  },
}));
function FindTutor() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { findTutor, selectedSearchSubject, loading } = useSelector(
    (state) => state.tutorsData
  );
  const { user } = useSelector((state) => state.usersData);


  useEffect(() => {
    debugger
    // dispatch(findTutorBySubject({subjectId:"6112c53023bbfb2051596729"}));
    if (selectedSearchSubject) {
      dispatch(findTutorBySubject({
        subjectId: selectedSearchSubject._id,
        // overRideLocation: [
        //   78.462976,
        //   17.416192
        // ],
        // filter: "location",
      }));
    }
    console.log('findTutor===========================', findTutor);
  }, [selectedSearchSubject]);

  const handleDegreeName = (value) => {
    let display = "";
    if (value.special_degrees.hasDegree) {
      display = `${value.special_degrees.branch}`;
      return display;
    } else if (value.pg.hasDegree) {
      display = `${value.pg.branch}`;
      return display;
    } else if (value.ug.hasDegree) {
      display = `${value.ug.branch}`;
      return display;
    }
  };
  const handleDegreeBranch = (value) => {
    let display = "";
    if (value.special_degrees.hasDegree) {
      display = `${value.special_degrees.name}`;
      return display;
    } else if (value.pg.hasDegree) {
      display = `${value.pg.name}`;
      return display;
    } else if (value.ug.hasDegree) {
      display = `${value.ug.name}`;
      return display;
    }
  };
  const handleContactAddress = (value) => {
    var address = JSON.parse(value.communicationAddress);
    return `${address.City} `;
  };

  return (
    <>
      <CustomBreadCrumbs heading="Tutor Results" subHeading="Find Tutor" />
      <TutorFilter provider="tutor" />
      {!loading ? (
        <Container maxWidth="sm" fixed>
          {findTutor && findTutor.length > 0 ? (
            <>
              {findTutor.map((value) => (
                <Link to={`tutors/${value.userId?._id}`} key={value._id}>
                  <Paper elevation={3}>
                    <Grid container className={classes.root} justifyContent='center'>
                      <Grid item xs={12} md={4}>

                        <Avatar
                          className={classes.providerAvatar}
                          alt={value.name}
                          src={value.userId.profileImage}
                        />

                      </Grid>
                      <Grid item container xs={12} md={8}>
                        <Grid xs={12}>
                          <h4>{value.name}</h4>
                        </Grid>
                        <Grid item xs={6}>
                          {/* <div className={classes.listDetails}> */}
                          <div className={classes.listDegree}>
                            <span className="position">
                              <i className="fas fa-user-graduate"></i>{" "}
                              {handleDegreeBranch(value)}
                            </span>
                            <span className="position">
                              <i className="fas fa-graduation-cap"></i>{" "}
                              {handleDegreeName(value)}
                            </span>
                            <span className="position">
                              <i className="fas fa-map-marker-alt"></i>{" "}
                              {handleContactAddress(value)}
                            </span>
                          </div>
                        </Grid>
                        <Grid xs={6}>
                          <Box
                            className={classes.listReview}
                            component="fieldset"
                            mb={0}
                            borderColor="transparent"
                          >
                            <Typography
                              component="legend"
                              className={classes.listAvgRating}
                            >
                              {value.avgRating}/5
                            </Typography>
                            <Rating
                              name="read-only"
                              value={value.avgRating}
                              readOnly
                            />
                            {/* <Typography
                                  component="legend"
                                  className={classes.listRating}
                                > */}
                            <p>  Based on {value.rating.length} Reviews</p>
                            {/* </Typography> */}
                          </Box>
                        </Grid>
                        {/* </div>  */}
                      </Grid>
                    </Grid>
                    {/* <List className={classes.root}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            className={classes.providerAvatar}
                            alt={value.name}
                            src={value.userId.profileImage}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          className={classes.listContent}
                          primary={value.name}
                          secondary={
                            <div className={classes.listDetails}>
                              <div className={classes.listDegree}>
                                <span className="position">
                                  <i className="fas fa-user-graduate"></i>{" "}
                                  {handleDegreeBranch(value)}
                                </span>
                                <span className="position">
                                  <i className="fas fa-graduation-cap"></i>{" "}
                                  {handleDegreeName(value)}
                                </span>
                                <span className="position">
                                  <i className="fas fa-map-marker-alt"></i>{" "}
                                  {handleContactAddress(value)}
                                </span>
                              </div> 
                               <Box
                                className={classes.listReview}
                                component="fieldset"
                                mb={0}
                                borderColor="transparent"
                              >
                                <Typography
                                  component="legend"
                                  className={classes.listAvgRating}
                                >
                                  {value.avgRating}/5
                                </Typography>
                                <Rating
                                  name="read-only"
                                  value={value.avgRating}
                                  readOnly
                                />
                                <Typography
                                  component="legend"
                                  className={classes.listRating}
                                >
                                  Based on {value.rating.length} Reviews
                                </Typography>
                              </Box> 
                             </div> 
                          }
                        />
			<Box
                                className={classes.listReview}
                                component="fieldset"
                                mb={0}
                                borderColor="transparent"
                              >
                                <Typography
                                  component="legend"
                                  className={classes.listAvgRating}
                                >
                                  {value.avgRating}/5
                                </Typography>
                                <Rating
                                  name="read-only"
                                  value={value.avgRating}
                                  readOnly
                                />
                                <Typography
                                  component="legend"
                                  className={classes.listRating}
                                >
                                  Based on {value.rating.length} Reviews
                                </Typography>
                              </Box>
                      </ListItem>
                    </List>*/}
                  </Paper>
                </Link>
              ))}
            </>
          ) : (
            <NoItemsFound
              dialogline={user ? "No Tutors Found!" : "Please Login!"}
            />
          )}
        </Container>
      ) : (
        <ProgressBar />
      )}
    </>
  );
}

export default FindTutor;
