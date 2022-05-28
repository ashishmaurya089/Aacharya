import { makeStyles } from "@material-ui/core/styles";
import { withThemeCreator } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    maxWidth: 300,
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto !important",
    },
  },
  seemore: {
    color: "#fff",
  },
  contentRoot: {
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
  courseType: {
    position: "relative",
    "& > p": {
      position: "absolute",
      background: theme.palette.primary.main,
      padding: theme.spacing(1, 2),
      top: 0,
      left: 0,
      color: "#000",
      borderTopLeftRadius: theme.spacing(1),
      textTransform: "capitalize",
    },
  },
  // Tutor Card
  tutor: {
    height: 400,
    position: "relative",
    maxWidth: 300,
    borderRadius: 10,
    borderBottom: `15px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto  !important",
    },
},
noWrap: {
	whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
	maxWidth:290,display:"block"
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
  },
  // Institute  Card
  instRoot: {
    borderRadius: 10,
    maxWidth: 400,
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
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
  // Download Banner
  appImg: {
    height: 500,
    borderRadius: 20,
    [theme.breakpoints.down("sm")]: {
      display: "block",
      margin: "0 auto",
    },
  },
  logoImg: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
      margin: "0 auto",
    },
    height: 100,
  },
  bannerContent: {
    margin: "20px auto",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    "& > p": {
      fontSize: 18,
    },
  },
  bannerIcons: {
    display: "flex",
    margin: "20px auto",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      display: "block",
    },
  },
  seemorebox: {
    // height: 100,
    display: "flex",
    padding: 8,
  },
  rightbox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  downloadIcon: {
    paddingTop: "1rem",
    paddingLeft: "35px",
    borderRadius: "50px",
    paddingRight: "35px",
    paddingBottom: "1rem",
    "&:hover": {
      background: "white",
    },
  },
  button: {
    padding: theme.spacing(1),
  },
}));
