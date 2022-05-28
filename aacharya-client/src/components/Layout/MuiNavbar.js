import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import axios from "../../axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Button,
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import { Notifications, Chat } from "@material-ui/icons";

import NotificationDrawer from "../NotificationDrawer";
import ProfileDrawer from "../UserProfie/ProfileDrawer";
import MobileMenu from "./MobileMenu";
import ChatList from "../Chats/ChatList";
import logo from "../../images/aacharya.png";
import { getProfile } from "../../actions/userActions";
import { emailLogin, adminEmailLogin } from '../../actions/registrationActions';
import {
  useParams
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 0.8,
    [theme.breakpoints.down("md")]: {
      flexGrow: 0.9,
    },
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    // marginLeft: 20,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navitems: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "& > h6": {
      fontSize: 16,
      fontWeight: 400,
      padding: "0 16px",
      "& > a": {
        color: "#55688b",
      },
    },
  },
  logo: {
    height: "55px",
    background: "#fff",
    borderRadius: "5px",
    marginTop: 7,
    [theme.breakpoints.up("md")]: {
      marginLeft: 100,
    },
    '@media(max-width:320px)': {
      marginLeft: -10,
      width: '12vh',
      height: 'auto',
    },

  },
  navbutton: {
    color: "#fff",
    // border: '1px solid #faa906',
    // background: theme.palette.primary.main,
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: "30px",
    textTransform: "capitalize",
  },
  menuItemList: {
    // display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    padding: theme.spacing(1, 2),
  },
}));

export default function MuiNavbar(props) {
  let accessToken = localStorage.getItem("accessToken");

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.registrationsData);
  const { user, providerProfile, learnerProfile } = useSelector(
    (state) => state.usersData
  );

  var [profileMenu, setProfileMenu] = useState(null);
  var [openDrawer, setopenDrawer] = useState(false);
  var [openNotification, setopenNotification] = useState(false);
  var [notification, setNotification] = useState([]);

  let [URL, setUrl] = useState(window.location.href.split("userid=").pop());

  let [userId, setUserId] = useState(URL.split('&')[0].trim());
  let [access_token, setTocken] = useState(window.location.href.split("=").pop());

  useEffect(() => {
    debugger
    if(userId !="" && access_token == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"){
      dispatch(adminEmailLogin(userId,access_token));
    }
    async function fetchData() {
      if (accessToken) {
        dispatch(getProfile());
        const data = await axios.get("/api/users/getNotifications");
        if (data.status) {
          setNotification(data.data.data.filter((noti) => !noti.isRead));
        }
      }
    }
    fetchData();
  }, [accessToken]);

  useEffect(() => {
    if (user && user.isTutor) {
      history.push("/tutor");
    } else if (user && user.isCoachingCenter) {
      history.push("/institute");
    }
  }, [accessToken, history]);

  const handleLogout = () => {
    dispatch({
      type: "USER_LOGOUT",
    });
    history.push("/");
    setProfileMenu(null);
  };
  const handleNotificationOpen = (bool) => {
    setopenNotification(bool);
    if (!bool) {
      setNotification([]);
    }
  };
  const handleDrawerOpen = (bool) => {
    setopenDrawer(bool);
  };

  const [openEvent, setOpenEvent] = React.useState(false);
  const [openServices, setOpenServices] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleEventToggle = () => {
    setOpenEvent((openPreEvent) => !openPreEvent);
  };
  const handleServicesToggle = () => {
    setOpenServices((openPreServices) => !openPreServices);
  };

  const handleEventClose = (event, route) => {
    setOpenEvent(false);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    history.push(route);
  };
  const handleServicesClose = (event, route) => {
    setOpenServices(false);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    history.push(route);
  };

  function handleListServiceKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenServices(false);
    }
  }
  function handleListEventKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenEvent(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const openPreEvent = React.useRef(openEvent);
  const openPreServices = React.useRef(openServices);
  React.useEffect(() => {
    if (openPreEvent.current === true && openEvent === false) {
      anchorRef.current.focus();
    }
    openPreEvent.current = openEvent;
    if (openPreServices.current === true && openServices === false) {
      anchorRef.current.focus();
    }
    openPreServices.current = openServices;
  }, [openEvent, openServices]);

  const renderPopperServicesMenu = (
    <Popper
      open={openServices}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      style={{ zIndex: 25 }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={(e) => handleServicesClose(e)}>
              <MenuList
                autoFocusItem={openServices}
                id="menu-service-grow"
                onKeyDown={handleListServiceKeyDown}
                className={classes.menuItemList}
                button
              >
                <MenuItem
                  onClick={(e) => handleServicesClose(e, "/tutors")}
                  button
                >
                  Find Tutor
                </MenuItem>
                <MenuItem
                  onClick={(e) => handleServicesClose(e, "/institutes")}
                >
                  Find Coaching Center
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
  const renderPopperEventMenu = (
    <Popper
      open={openEvent}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      style={{ zIndex: 25 }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={(e) => handleEventClose(e)}>
              <MenuList
                autoFocusItem={openEvent}
                id="menu-event-grow"
                onKeyDown={handleListEventKeyDown}
                className={classes.menuItemList}
              >
                <MenuItem onClick={(e) => handleEventClose(e, "/competitions")}>
                  Competitions
                </MenuItem>
                <MenuItem onClick={(e) => handleEventClose(e, "/workshops")}>
                  Workshops
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
  return (
    <>
      <div style={{ minHeight: 68 }}></div>
      <div className={classes.grow}>
        <AppBar position="fixed" style={{ background: "#fff", zIndex: 20 }}>
          <Toolbar>
            {user && user.isTutor ? (
              <Link to="/tutor">
                <img src={logo} alt="logo" className={`${classes.logo} mb-2`} />
              </Link>
            ) : user && user.isCoachingCenter ? (
              <Link to="/institute">
                <img src={logo} alt="logo" className={`${classes.logo} mb-2`} />
              </Link>
            ) : (
              <Link to="/">
                <img src={logo} alt="logo" className={`${classes.logo} mb-2`} />
              </Link>
            )}

            <div className={classes.grow} />

            <div className={classes.navitems}>
              {user && user.isTutor ? (
                <>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="/tutor"
                    // activeStyle={{
                    // 	fontWeight: 'bold',
                    // 	color: '#FAA906',
                    // }}
                    >
                      Home
                    </NavLink>
                  </Typography>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="/tutor-subjects"
                    // activeStyle={{
                    // 	fontWeight: 'bold',
                    // 	color: '#FAA906',
                    // }}
                    >
                      Subjects
                    </NavLink>
                  </Typography>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="/tutor-dashboard"
                    // activeStyle={{
                    // 	fontWeight: 'bold',
                    // 	color: '#FAA906',
                    // }}
                    >
                      Dashboard
                    </NavLink>
                  </Typography>
                </>
              ) : user && user.isCoachingCenter ? (
                <>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="/institute"
                    // activeStyle={{
                    // 	fontWeight: 'bold',
                    // 	color: '#FAA906',
                    // }}
                    >
                      Home
                    </NavLink>
                  </Typography>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="/institute-courses"
                    // activeStyle={{
                    // 	fontWeight: 'bold',
                    // 	color: '#FAA906',
                    // }}
                    >
                      Courses
                    </NavLink>
                  </Typography>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="/institute-dashboard"
                    // activeStyle={{
                    // 	fontWeight: 'bold',
                    // 	color: '#FAA906',
                    // }}
                    >
                      Dashboard
                    </NavLink>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="/"
                    // activeStyle={{
                    // 	fontWeight: 'bold',
                    // 	color: '#FAA906',
                    // }}
                    >
                      Home
                    </NavLink>
                  </Typography>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="/about"
                    // activeStyle={{
                    // 	fontWeight: 'bold',
                    // 	color: '#FAA906',
                    // }}
                    >
                      About
                    </NavLink>
                  </Typography>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="#"
                      // activeStyle={{
                      // 	fontWeight: 'bold',
                      // 	color: '#FAA906',
                      // }}
                      ref={anchorRef}
                      aria-controls={
                        openEvent ? "menu-service-grow" : undefined
                      }
                      aria-haspopup="true"
                      onClick={handleServicesToggle}
                    // onClick={handleServicesMenuOpen}
                    >
                      Services
                    </NavLink>
                  </Typography>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="#"
                      // activeStyle={{
                      // 	fontWeight: 'bold',
                      // 	color: '#FAA906',
                      // }}
                      ref={anchorRef}
                      aria-controls={
                        openServices ? "menu-event-grow" : undefined
                      }
                      aria-haspopup="true"
                      onClick={handleEventToggle}
                    // onClick={handleEventMenuOpen}
                    >
                      Events
                    </NavLink>
                  </Typography>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="/skills"
                    // activeStyle={{
                    // 	fontWeight: 'bold',
                    // 	color: '#FAA906',
                    // }}
                    >
                      Skills
                    </NavLink>
                  </Typography>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="/press-media"
                    // activeStyle={{
                    // 	fontWeight: 'bold',
                    // 	color: '#FAA906',
                    // }}
                    >
                      Press & Media
                    </NavLink>
                  </Typography>
                  <Typography variant="h6" noWrap>
                    <NavLink
                      exact
                      to="/contact"
                    // activeStyle={{
                    // 	fontWeight: 'bold',
                    // 	color: '#FAA906',
                    // }}
                    >
                      Contact
                    </NavLink>
                  </Typography>
                </>
              )}
            </div>
            {!accessToken ? (
              <>
                <div className={classes.sectionMobile}>
                  <MobileMenu />
                </div>
                <Link to="/login">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.navbutton}
                  >
                    Sign In / Sign Up!
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <IconButton
                  aria-label="notification"
                  color="primary"
                  onClick={() => handleNotificationOpen(true)}
                >
                  <Badge badgeContent={notification.length} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                {openNotification && (
                  <NotificationDrawer
                    handleDrawerClose={() => handleNotificationOpen(false)}
                    notifications={notification}
                  />
                )}
                <IconButton
                  aria-label="chat"
                  color="primary"
                  onClick={handleDrawerOpen}
                >
                  <Chat />
                </IconButton>
                <ChatList
                  openChat={openDrawer}
                  handleDrawerClose={() => setopenDrawer(false)}
                />
                {/* Components */}

                <ProfileDrawer handleLogout={handleLogout} />
                <div className={classes.sectionMobile}>
                  <MobileMenu />
                </div>
              </>
            )}
          </Toolbar>
        </AppBar>
        {renderPopperServicesMenu}
        {renderPopperEventMenu}
      </div>
    </>
  );
}
