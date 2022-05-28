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
  IconButton,
  Typography,

} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  callTutor,
  getAllTutors,
  getTutorById,
} from "../../actions/tutorActions";
import Work from "@material-ui/icons/Work";
import ProgressBar from "../../components/ProgressBar";
import { useHistory } from "react-router-dom";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CallIcon from "@material-ui/icons/Call";
import MessageIcon from "@material-ui/icons/Message";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import StarIcon from "@material-ui/icons/Star";
import Paper from "@material-ui/core/Paper";
import useStyles from "./styles";
import PostRating from "../../components/Rating/PostRating";
import GetRating from "../../components/Rating/GetRating";
import { getProfile, getRating } from "../../actions/userActions";
import ChatRoom from "../../components/Chats/ChatRoom";
import ChatList from "../../components/Chats/ChatList";
import { startChat } from "../../actions/chatActions";
import { toast } from "react-toastify";
import Rating from "@material-ui/lab/Rating";
import ChipListLevel from "../../components/Common/ChipListLevel";
import DisplayButton from "../../components/Common/DisplayButton";
import ListOfSubjects from "../../components/Common/ListOfSubjects";

function TutorInfo() {
  const classes = useStyles();
  const history = useHistory();
  const { tutors, tutorProfile, selectedSearchSubject, loading } = useSelector(
    (state) => state.tutorsData
  );
  const { allRatings, user } = useSelector((state) => state.usersData);
  // console.log('all rating>>>',allRatings);
  const dispatch = useDispatch();

  const { tutorId } = useParams();
  //console.log("tutorId", tutorId);
  let accessToken = localStorage.getItem("accessToken");

  // const [selectedTutorDetails, setselectedTutorDetails] = useState([]);
  const [open, setopen] = useState(false);
  const [openList, setopenList] = useState(false);
  const [chatListOpen, setchatListOpen] = React.useState(false);
  const [chatRoomOpen, setchatRoomOpen] = React.useState(false);
  const [openChatDrawer, setopenChatDrawer] = React.useState(false);

  // useEffect(() => {
  // 	dispatch(getAllTutors());
  // 	let selectedTutorDetails = tutors.filter((tut) => tut._id === tutorId);
  // 	if (selectedTutorDetails.length > 0) {
  // 		setselectedTutorDetails(selectedTutorDetails[0]);
  // 	}
  // }, []);
  useEffect(() => {
    dispatch(getTutorById(tutorId));
  }, [tutorId]);

  // //console.log('selectedTutorDetails', selectedTutorDetails);
  useEffect(() => {
    if (tutorProfile && tutorProfile._id) {
      if (tutorProfile.userId) dispatch(getRating(tutorProfile.userId._id));
    }
  }, [tutorProfile]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getProfile());
    }
  }, [accessToken, allRatings]);

  const handleReview = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };
  const handleChat = () => {
    if (user?.isTutor) {
      return toast.error("Login in as a Student / Parent");
    }
    if (user?.isCoachingCenter) {
      return toast.error("Login in as a Student / Parent");
    }
    if (!user) {
      return toast.error("Please Login");
    }
    if (tutorProfile.userId) {
      dispatch(startChat(tutorProfile.userId._id));
    }

    // if (user && !user.user.premiumStatus) {
    // 	toast.error('Subscribe to premium');
    // }
    setopenChatDrawer(true);
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
  // console.log("selectedTutorDetails", tutorProfile);

  const handleTeachingPre = (value) => {
    let display = "";
    if (value.teachingPreferences == 1) {
      display = "Online";
      return display;
    } else if (value.teachingPreferences == 2) {
      display = "Student Home";
      return display;
    } else if (value.teachingPreferences == 3) {
      display = "Tutor Home";
      return display;
    } else {
      display = "Aacharya Center";
      return display;
    }
  };
  function highestDegree(){
    if(tutorProfile.special_degrees.hasDegree){
      return {name:tutorProfile.special_degrees.name,branch:tutorProfile.special_degrees.branch};
    }
    if(tutorProfile.pg.hasDegree){
      return {name:tutorProfile.pg.name,branch:tutorProfile.pg.branch};
    }
    if(tutorProfile.ug.hasDegree){
      return {name:tutorProfile.ug.name,branch:tutorProfile.ug.branch};
    }
  };
  const handleContactAddress = (value) => {
    var address = JSON.parse(value.communicationAddress);
    return `${address.Locality}, ${address.City}`;
  };
  return (
    <>
      {/* <Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop> */}
      <ChatList
        openChat={openChatDrawer}
        handleDrawerClose={() => setopenChatDrawer(false)}
      />
      {/* <ChatRoom
				setChatListOpen={setChatListOpen}
				setchatRoomOpen={setchatRoomOpen}
		
			/> */}
      <PostRating open={open} handleClose={handleClose} data={tutorProfile} />
      {loading ? (
        <>
          <ProgressBar />
        </>
      ) : (
        <>
          {tutorProfile && (
            <Container maxWidth="md">
              <Grid container spacing={2}>
                <Grid item xs className={classes.grid}>
                  <img
                    className={classes.profileImg}
                    src={tutorProfile?.userId?.profileImage}
                    alt="profile img"
                  />
                </Grid>
                <Grid item xs className={classes.grid}>
                  <Typography variant="h6" className={classes.titleFontProp}>
                    Tution Rate / Hour
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.fontProperties}
                  >
                    ₹ {tutorProfile.avgRatePerHr}
                  </Typography>
                  <Typography variant="h6" className={classes.titleFontProp}>
                    Tution Rate / Month
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.fontProperties}
                  >
                    ₹ {tutorProfile.avgRatePerMonth}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<CallIcon />}
                    disabled={!tutorProfile.userId?.premiumStatus}
                    onClick={() => handleCall()}
                  >
                    Call
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<MessageIcon />}
                    //     disabled={user && !user.premiumStatus}
                    onClick={() => handleChat()}
                  >
                    Message
                  </Button>
                </Grid>
              </Grid>
              <Typography
                variant="h5"
                gutterBottom
                className={classes.fontProperties}
              >
                {tutorProfile.name}
              </Typography>
              <Typography variant="body1">
                <i className="fas fa-map-marker-alt"></i>{" "}
                {/* {tutorProfile.userId && tutorProfile.userId.place.place},{" "}
                {tutorProfile.userId && tutorProfile.userId.place.state} */}
                {handleContactAddress(tutorProfile)}
              </Typography>
              <Typography variant="body1">
                <i className="fas fa-graduation-cap"></i>{" "}
                {highestDegree().name} in{" "}
                {highestDegree().branch}
              </Typography>
              <Typography variant="body1">
                <Work />{" "}
                {tutorProfile?.totalWorkExperienceInYears} Years
              </Typography>
              <Divider className="my-2" />
              <Typography variant="h5" className={classes.subHeading}>
                Educational Qualification
              </Typography>
              <div className={classes.sideHeading}>
                {tutorProfile.ug && tutorProfile.ug.hasDegree && (
                  <>
                    <Typography variant="subtitle1" className={classes.span}>
                      <i className="fas fa-graduation-cap"></i> Under Graduation
                      Details
                    </Typography>
                    <Typography variant="body1">
                      {tutorProfile.ug &&
                        `${tutorProfile.ug.name} (${tutorProfile.ug.yearOfCompletion})`}
                    </Typography>
                    <Typography variant="body1">
                      {tutorProfile.ug && tutorProfile.ug.branch}
                    </Typography>
                    <Typography variant="body1">
                      {tutorProfile.ug && tutorProfile.ug.instituteName}
                    </Typography>
                  </>
                )}

                {tutorProfile.pg && tutorProfile.pg.hasDegree && (
                  <>
                    <Typography variant="subtitle1" className={classes.span}>
                      <i className="fas fa-graduation-cap"></i> Post Graduation
                      Details
                    </Typography>
                    <Typography variant="body1">
                      {tutorProfile.pg &&
                        `${tutorProfile.pg.name} (${tutorProfile.pg.yearOfCompletion})`}
                    </Typography>
                    <Typography variant="body1">
                      {tutorProfile.pg && tutorProfile.pg.branch}
                    </Typography>
                    <Typography variant="body1">
                      {tutorProfile.pg && tutorProfile.pg.instituteName}
                    </Typography>
                  </>
                )}
                {tutorProfile.special_degrees &&
                  tutorProfile.special_degrees.hasDegree && (
                    <>
                      <Typography variant="subtitle1" className={classes.span}>
                        <i className="fas fa-graduation-cap"></i> Special Degree
                        Details
                      </Typography>
                      <Typography variant="body1">
                        {tutorProfile.special_degrees &&
                          `${tutorProfile.special_degrees.name} (${tutorProfile.special_degrees.yearOfCompletion})`}
                      </Typography>
                      <Typography variant="body1">
                        {tutorProfile.special_degrees &&
                          tutorProfile.special_degrees.branch}
                      </Typography>
                      <Typography variant="body1">
                        {tutorProfile.special_degrees &&
                          tutorProfile.special_degrees.instituteName}
                      </Typography>
                    </>
                  )}
              </div>
              <Divider className="my-2" />
              <Typography variant="h6" className="my-2">
                <i className="fas fa-chalkboard"></i> Work Information:{" "}
                <span className={classes.span}>
                  {tutorProfile.currentDeisgnation} in{" "}
                  {tutorProfile.currentWork}
                </span>
              </Typography>
              <Divider className="my-2" />
              {tutorProfile.permittedLevels && (
                <ChipListLevel
                  data={tutorProfile.permittedLevels}
                  title={"Subject Levels"}
                />
              )}
              <Divider className="my-2" />
              {tutorProfile.subjects && (
                <>
                  <DisplayButton
                    title={"List of Subjects Offered"}
                    setopenList={setopenList}
                  />
                  <ListOfSubjects
                    open={openList}
                    handleClose={() => setopenList(false)}
                    data={tutorProfile.subjects}
                    title={"Subjects"}
                  />{" "}
                </>
              )}

              <Divider className="my-2" />
              {/* <Typography variant="h6" className="my-2">
                <i className="fas fa-chalkboard"></i> Work Information:{" "}
                <span className={classes.span}>
                  {tutorProfile.currentDeisgnation} in{" "}
                  {tutorProfile.currentWork}
                </span>
              </Typography>
              <Divider className="my-2" /> */}
              {tutorProfile?.availability?.length > 0 && (
                <Typography variant="h6" className="my-2">
                  <i className="fas fa-user-clock"></i> Avaliable Slots:{" "}
                  {tutorProfile.availability &&
                    tutorProfile?.availability?.map((slot, i) => (
                      <Chip
                        icon={<AccessTimeIcon />}
                        label={slot}
                        key={i}
                        className={classes.chips}
                        color="primary"
                      />
                    ))}
                </Typography>
              )}
              <Divider className="my-2" />
              <Typography variant="h5" className={classes.subHeading}>
                Preferences
              </Typography>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        One to One Tution
                      </TableCell>
                      <TableCell align="right">
                        {tutorProfile.oneToOne ? "Available" : "Not Available"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Group Tution
                      </TableCell>
                      <TableCell align="right">
                        {tutorProfile.oneToMany ? "Available" : "Not Available"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Online Tution
                      </TableCell>
                      <TableCell align="right">
                        {/* {tutorProfile.teachingPreferences === 1
											? 'Available'
											: 'Not Available'} */}
                        {tutorProfile.offersOnline
                          ? "Available"
                          : "Not Available"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Offline Tution
                      </TableCell>
                      <TableCell align="right">
                        {tutorProfile.offersOffline
                          ? "Available"
                          : "Not Available"}
                        {/* {tutorProfile.teachingPreferences === 4
											? 'Available'
											: 'Not Available'} */}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Short Term Period
                      </TableCell>
                      <TableCell align="right">
                        {tutorProfile.shortTerm ? "Available" : "Not Available"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Monthly Basis
                      </TableCell>
                      <TableCell align="right">
                        {tutorProfile.monthly ? "Available" : "Not Available"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Tution Point
                      </TableCell>
                      <TableCell align="right">
                        {tutorProfile.hasTuitionCenter
                          ? "Available"
                          : "Not Available"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Tution at Tutor Home
                      </TableCell>
                      <TableCell align="right">
                        {tutorProfile.teachingPreferences === 3
                          ? "Available"
                          : "Not Available"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Tution at Student Home
                      </TableCell>
                      <TableCell align="right">
                        {tutorProfile.teachingPreferences === 2
                          ? "Available"
                          : "Not Available"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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
                  value={tutorProfile.avgRating}
                  readOnly
                />
              </div>
              <Typography variant="h5" align="center">
                Based on {tutorProfile?.rating?.length} Reviews
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
    </>
  );
}

export default TutorInfo;
