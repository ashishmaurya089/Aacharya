import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  tagline: {
    [theme.breakpoints.up("sm")]: {
      fontSize: 20,
    },
    padding: "0 20px",
  },
  // CSW Carousel Card
  root: {
    borderRadius: "10px !important",
    margin: "20px auto",
    maxWidth: 260,
    [theme.breakpoints.down("sm")]: {
      margin: "20px 5px",
    },
  },
  cardContent: {
    // height: 105,
    padding: "16px 16px 0",
  },
  media: {
    height: 160,
  },
  price: {
    marginLeft: 8,
    "& > p": {
      marginRight: 16,
    },
    "& > h6": {
      marginRight: 16,
    },
  },
  priceStrike: {
    textDecoration: "line-through",
  },
  registrationsOpen: {
    color: "#228B22",
    fontWeight: 700,
    marginLeft: theme.spacing(1),
  },
  registrationsClosed: {
    color: "#FF0000",
    fontWeight: 700,
    marginLeft: theme.spacing(1),
  },
  // Banner Carousel Card
  bannerCardRoot: {
    margin: theme.spacing(2, 3),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 1),
    },
  },
  bannerCardMedia: {
    width: "100%",
    height: "auto",
    maxHeight: 350,
  },
  // Tutor Carousel Card
  tutor: {
    height: 400,
    position: "relative",
    maxWidth: 300,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: "10px !important",
    borderBottom: `15px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down("sm")]: {
      margin: "0 5px",
      height: 400,
    },
  },
  noWrap: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth:290,display:"block",
  },
  tutorBackdrop: {
    zIndex: 0,
    position: "absolute",
    margin: "0 auto",
    top: 0,
    right: 0,
    left: 0,
    height: 110,
    background: theme.palette.primary.main,
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
  },
  tutorImg: {
    position: "absolute",
    top: "40px",
    right: 0,
    left: 0,
    height: "150px !important",
    width: "150px !important",
    margin: "0  auto",
    [theme.breakpoints.down("sm")]: {
      height: "100px !important",
      width: "100px !important",
      top: "50px",
    },
  },
  tutorInfo: {
    position: "absolute",
    top: "200px",
    left: 0,
    right: 0,
    textAlign: "center",
    "& > span": {
      color: "#96a1af",
      marginBottom: "8px !important",
    },
    [theme.breakpoints.down("sm")]: {
      top: "160px",
    },
  },
  // Institute Carousel Card
  instRoot: {
    borderRadius: "10px !important",
    maxWidth: 400,
    margin: "0 20px",
    [theme.breakpoints.down("sm")]: {
      margin: "0 5px",
    },
  },
  ctcAddress: {
    color: "#000",
  },
  instBackdrop: {
    // height: 185,
    objectFit: "revert",
    height: 120,
  },
  instContent: {
    background: theme.palette.primary.main,
    "& > h2": {
      fontWeight: 600,
    },
    "& > p": {
      // color: '#fff',
    },
  },
  instLogoImg: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 55,
    right: 30,
    borderRadius: 5,
    border: "4px #fff solid",
  },
  //PressMedia Carousel
  backdrop: {
    zIndex: `${theme.zIndex.drawer + 1} !important`,
    color: "#fff",
  },
  backdropImg: {
    objectFit: "contain",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
  },
  headingStyle: {
    paddingBottom: "10px",
    textTransform: "uppercase",
    position: "relative",
    fontSize: 30,
    fontWeight: "bold !important",
    "&:after": {
      content: '""',
      background: "#FAA906",
      position: "absolute",
      bottom: 0,
      left: "calc(50% - 25px)",
      height: "4px",
      width: "50px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
  },
}));
