import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { MoreVert, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchSubjects } from "../../../actions/subjectActions";
import { getTutorById } from "../../../actions/tutorActions";
import { getProfile, removeSubject } from "../../../actions/userActions";
import NoItemsFound from "../../../components/NoItemsFound";
import ProgressBar from "../../../components/ProgressBar";
import SubscriptionBanner from "../../../components/SubscriptionBanner";
import SegmentSearch from "../../Category/SegmentSearch";
import SpecificSubject from "./SpecificSubject";
import useStyles from "./styles";

function ProviderPermittedLevels() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { user, providerProfile, learnerProfile, subjectAddRemove, loading } =
    useSelector((state) => state.usersData);
  const { searchedSubjects } = useSelector((state) => state.subjectsData);
  // const { tutorProfile, loading } = useSelector((state) => state.tutorsData);
  // //console.log('tutorProfile>>>>>>>>>>>>>>', tutorProfile);
  console.log(providerProfile, '-------------------')
  const [searchTerm, setsearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [subjectIds, setsubjectIds] = useState("");
  const [count, setcount] = useState(0);
  const [openSpecificSub, setopenSpecificSub] = useState(false);
  const [specificSubject, setspecificSubject] = useState({});

  // useEffect(() => {
  // 	if (user && user.user._id) dispatch(getTutorById(user.user._id));
  // }, []);

  useEffect(() => {
    dispatch(searchSubjects(searchTerm));
  }, [searchTerm]);

  const ITEM_HEIGHT = 48;
  const handleClick = (event, subjectId) => {
    setsubjectIds(subjectId);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [count]);

  const hanldeRemoveSubject = (msg) => {
    if (msg === "remove") {
      dispatch(removeSubject([subjectIds]));
      setsubjectIds("");
    }
    handleClose();
    // Here Setting setTimeOut, because loading action settimeout also 600
    setTimeout(() => {
      setcount((count) => count + 1);
    }, 600);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelected = (id) => {
    dispatch({
      type: "SELECT_LEVEL",
      payload: id,
    });
  };
  const handleSeachedSubjects = (value) => {
    setsearchTerm("");
    setopenSpecificSub(true);
    setspecificSubject(value);
    //console.log(value);
  };
  //console.log(searchTerm);

  return (
    <Container maxWidth="lg" fixed>
      <SpecificSubject
        data={specificSubject}
        open={openSpecificSub}
        handleClose={() => setopenSpecificSub(false)}
      />

      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search />
        </div>
        <InputBase
          placeholder="Search Subject"
          vaue={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      {searchedSubjects.length > 0 && (
        <Card className={classes.cardList}>
          <div className={classes.dataResult}>
            {searchedSubjects.map((value) => (
              <div
                key={value._id}
                className={classes.dataItem}
                onClick={() => handleSeachedSubjects(value)}
              >
                <div className={classes.dataItemList}>
                  <Search />
                  <div>
                    <p>{value.name}</p>
                    {value.stream && value.stream.name && (
                      <>
                        <small>Stream: {value.stream.name}</small> <br />
                      </>
                    )}
                    {value.level && value.level.name && (
                      <small>Level: {value.level.name}</small>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {providerProfile && (
        <>
          <Typography variant="h6" className={classes.tutorSubjectsLevels}>
            Permitted Levels
          </Typography>
          {!loading ? (
            <Grid container spacing={2}>
              {providerProfile.permittedLevels.length > 0 ? (
                providerProfile.permittedLevels.map((value) => (
                  <Grid item xs={12} sm={6} md={3} key={value._id}>
                    <Link to="/providerstream">
                      <Card
                        className={classes.tutorSubjectsRoot}
                        variant="outlined"
                        onClick={() => handleSelected(value._id)}
                      >
                        <CardActionArea>
                          <CardMedia
                            className={classes.tutorSubjectsMedia}
                            component="img"
                            image={value.icon}
                            title={value.name}
                          />
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {value.name}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                ))
              ) : (
                <>
                  <NoItemsFound dialogline="No Permitted Levels!" />
                </>
              )}
            </Grid>
          ) : (
            <ProgressBar />
          )}

          <Grid style={{ display: 'none' }} >
            <SubscriptionBanner type="gold" />
          </Grid>

          <Typography variant="h6" className={classes.tutorSubjectsLevels}>
            Active Subjects
          </Typography>
          {!loading ? (
            <Grid container>
              {providerProfile.subjects.length > 0 ? (
                providerProfile.subjects.map((value) => (
                  <Grid item xs={12} key={value._id}>
                    <Divider />
                    <List>
                      <ListItem>
                        {/* <ListItemText
                          primary={value.name}
                          secondary={value?.level?.name}
                        />
			 */}
                        <div>
                          <h6 ><strong>{value?.name}</strong></h6>
                          <p>{value?.category?.name}<br />
                            {value?.level?.name}<br />
                            {value?.stream?.name}</p>
                        </div>
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={(e) => handleClick(e, value._id)}
                          >
                            <MoreVert />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                              style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                // width: '20ch',
                                padding: "0 8px",
                              },
                            }}
                          >
                            <MenuItem
                              onClick={() => hanldeRemoveSubject("remove")}
                            >
                              Make in Active
                            </MenuItem>
                          </Menu>
                        </ListItemSecondaryAction>
                        <Divider />
                      </ListItem>
                    </List>
                  </Grid>
                ))
              ) : (
                <>
                  <NoItemsFound dialogline="No Active Subjects!" />
                </>
              )}
            </Grid>
          ) : (
            <ProgressBar />
          )}
          <Grid style={{ display: 'none' }} >
            <SubscriptionBanner type="silver" />
          </Grid>
        </>
      )}
    </Container>
  );
}

export default ProviderPermittedLevels;
