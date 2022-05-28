import {
  Backdrop,
  Button,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CallIcon from "@material-ui/icons/Call";
import MessageIcon from "@material-ui/icons/Message";
import StarIcon from "@material-ui/icons/Star";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  callTutor,
  getAllInstitutes,
  getTutorById,
} from "../../actions/tutorActions";
import { getProfile, getRating } from "../../actions/userActions";
import GetRating from "../../components/Rating/GetRating";
import PostRating from "../../components/Rating/PostRating";
import { EventAvailable } from "@material-ui/icons";

import useStyles from "./styles";
import { toast } from "react-toastify";
import ChatList from "../../components/Chats/ChatList";
import Rating from "@material-ui/lab/Rating";
import { startChat } from "../../actions/chatActions";

import ChipListLevel from "../../components/Common/ChipListLevel";
import ListOfSubjects from "../../components/Common/ListOfSubjects";
import DisplayButton from "../../components/Common/DisplayButton";
import ProgressBar from "../../components/ProgressBar";

export default function InstituteInfo() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { tutors, tutorProfile, loading, selectedSearchSubject, institutes } =
    useSelector((state) => state.tutorsData);
  const { allRatings, user } = useSelector((state) => state.usersData);

  const [open, setopen] = useState(false);
  const [openList, setopenList] = useState(false);
  const [openChatDrawer, setopenChatDrawer] = React.useState(false);

  const { instituteId } = useParams();

  // const [selectedInstituteDetails, setselectedInstituteDetails] = useState([]);
  // useEffect(() => {
  // 	dispatch(getAllInstitutes());
  // 	let selectedInstituteDetails = institutes.filter(
  // 		(inst) => inst._id === instituteId
  // 	);
  // 	if (selectedInstituteDetails.length > 0) {
  // 		setselectedInstituteDetails(selectedInstituteDetails[0]);
  // 	}
  // }, []);
  useEffect(() => {
  debugger
    dispatch(getTutorById(instituteId));
  }, [instituteId]);

  let accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      dispatch(getProfile());
    }
  }, [accessToken, allRatings]);
  //console.log("selectedInstituteDetails", tutorProfile);
  //console.log("ALlrating", allRatings);
  //console.log('>>>>>',openChatDrawer);
  useEffect(() => {
    if (tutorProfile && tutorProfile._id) {
      if (tutorProfile.userId) dispatch(getRating(tutorProfile.userId._id));
    }
  }, [tutorProfile]);
  const handleReview = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };
  const handleChat = () => {
    if (user && user.isTutor) {
      return toast.error("Login in as a Student / Parent");
    }
    if (user && user.isCoachingCenter) {
      return toast.error("Login in as a Student / Parent");
    }
    if (!user) {
      return toast.error("Please Login");
    }
    if (tutorProfile.userId) {
      dispatch(startChat(tutorProfile.userId._id));
      setopenChatDrawer(true);
    }
  };
  const handleCall = () => {
    if (user && user.isTutor) {
      return toast.error("Login in as a Student / Parent");
    }
    if (user && user.isCoachingCenter) {
      return toast.error("Login in as a Student / Parent");
    }
    if (!user) {
      return toast.error("Please Login");
    }
    if (tutorProfile.userId) {
      dispatch(callTutor(tutorProfile.userId._id, selectedSearchSubject._id));
    }
  };
  // if (tutorProfile.communicationAddress) {
  // 	var address = JSON.parse(tutorProfile.communicationAddress);
  // }
  const handleAddress = () => {
    if (tutorProfile && tutorProfile.communicationAddress) {
      var address = JSON.parse(tutorProfile.communicationAddress);
      return (
        <>
          {address.Address}, {address.Locality}, {address.City},{address.State},{" "}
          {address.Country}
        </>
      );
    }
  };
  return (
    <div>
      {/* <Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop> */}
      <ChatList
        openChat={openChatDrawer}
        handleDrawerClose={() => setopenChatDrawer(false)}
      />
      <PostRating open={open} handleClose={handleClose} data={tutorProfile} />
      {loading ? (
        <>
          <ProgressBar />
        </>
      ) : (
        <>
          {tutorProfile && (
            <Container maxWidth="md">
              <div style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  alt={tutorProfile.instituteName}
                  image={tutorProfile.instituteBackdrop}
                  title={tutorProfile.instituteName}
                  className={classes.instituteBackdrop}
                />
                <Grid container spacing={2} classsName={classes.logoImg}>
                  <Grid item xs className={`${classes.grid} ${classes.logo}`}>
                    <img
                      className={`${classes.profileImg}`}
                      src={tutorProfile && tutorProfile.instituteLogo}
                      alt="profile img"
                    />
                  </Grid>
                  <Grid item xs={6} className={classes.grid}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth={true}
                      className={classes.button}
                      startIcon={<CallIcon />}
                      disabled={!tutorProfile?.userId?.premiumStatus}
                      onClick={() => handleCall()}
                    >
                      Call
                    </Button>
                  </Grid>
                  <Grid item xs={6} className={classes.grid}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth={true}
                      className={classes.button}
                      startIcon={<MessageIcon />}
                //       disabled={user && user.user && !user.user.premiumStatus}
                      onClick={() => handleChat()}
                    >
                      Message
                    </Button>
                  </Grid>
                </Grid>
              </div>

              <Typography variant="h5" className={classes.subHeading}>
                {tutorProfile.instituteName}
              </Typography>
              <Typography variant="body1">
                <i className="fas fa-globe"></i> {tutorProfile.instituteWebsite}
              </Typography>
              <Typography variant="body1">
                <i className="fas fa-map-marker-alt"></i>{" "}
                {/* {tutorProfile.communicationAddress && (
							<>
								{address.Address}, {address.Locality}, {address.City},
								{address.State}, {address.Country}
							</>
						)} */}
                {handleAddress()}
              </Typography>
              <Divider className="my-2" />
              <Typography variant="h6" className="my-2">
                <i className="fas fa-user-tie"></i> Head of Institute:{" "}
                <span className={classes.span}>
                  {tutorProfile.instituteHeadName}
                </span>
              </Typography>
              <Divider className="my-2" />
              {tutorProfile.permittedLevels && (
                <ChipListLevel
                  data={tutorProfile.permittedLevels}
                  title={"Coaching Levels"}
                />
              )}
              <Divider className="my-2" />
              {tutorProfile.subjects && (
                <>
                  <DisplayButton
                    title={"List of Courses Offered"}
                    setopenList={setopenList}
                  />
                  <ListOfSubjects
                    open={openList}
                    handleClose={() => setopenList(false)}
                    data={tutorProfile.subjects}
                    title={"Tution Subjects"}
                  />
                </>
              )}

              <Divider className="my-2" />
              <Typography variant="h6" className="my-2">
                <i className="fas fa-calendar-week"></i> Open On:{" "}
                {tutorProfile.instituteOpenOn &&
                  tutorProfile.instituteOpenOn.map((slot, i) => (
                    <Chip
                      icon={<EventAvailable />}
                      label={slot}
                      key={i}
                      className={classes.chips}
                      color="primary"
                    />
                  ))}
              </Typography>
              <Divider className="my-2" />
              <Typography variant="h6" className="my-2">
                <i className="fas fa-user-clock"></i> Avaliable Slots:{" "}
                {tutorProfile.availability &&
                  tutorProfile.availability.map((slot, i) => (
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={slot}
                      key={i}
                      className={classes.chips}
                      color="primary"
                    />
                  ))}
              </Typography>
              <Divider className="my-2" />
              <Typography
                variant="h5"
                align="center"
                className={classes.subHeading}
              >
                Reviews
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                className={classes.subHeading}
              >
                {tutorProfile.avgRating}
              </Typography>
              <div align="center">
                <Rating
                  className={classes.subHeading}
                  name="read-only"
                  align="center"
                  value={tutorProfile.avgRating}
                  readOnly
                />
              </div>
              <Typography variant="h5" align="center">
                Based on{" "}
                {tutorProfile &&
                  tutorProfile.rating &&
                  tutorProfile.rating.length}{" "}
                Reviews
              </Typography>
              <Divider className="my-2" />
              <Button
                variant="outlined"
                align="center"
                color="primary"
                size="medium"
                className={classes.reviewButton}
                onClick={handleReview}
              >
                Write a Review
              </Button>
              {/* GetRating Component */}
              <GetRating allRatings={allRatings} />
            </Container>
          )}
        </>
      )}
    </div>
  );
}
