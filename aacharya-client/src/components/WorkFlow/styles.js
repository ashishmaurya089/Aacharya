import { makeStyles } from "@material-ui/core/styles";
import PatternBG from "./assets/patternBG.png";

export default makeStyles((theme) => ({
  workflow: {
    // backgroundColor: '#EA3A60',
    // backgroundColor: '#FF0606',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${PatternBG})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    paddingBottom: 80,
    [theme.breakpoints.down('sm')]:{
      paddingBottom:0
    }
  },
  step: {
    margin: "0 auto",
    // padding: 20,
    background: "#fff",
    borderRadius: 30,
    height: 80,
    width: 120,
    // fontSize: '55px',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > h2": {
      fontSize: "28px",
    },
    [theme.breakpoints.down("sm")]: {
      "& > h2": {
        fontSize: "20px",
      },
      height: 50,
    },
  },

  workFlowContent: {
    textAlign: "center",
    "& > h2": {
      // [theme.breakpoints.up('lg')]: {
      // 	width: 'max-content',
      // },
      color: "#ffffff",
      marginTop: 50,
      fontSize: "22px",
      lineHeight: "1.55",
      "& > i": {
        // color: '#000',
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& > h2": {
        marginTop: 0,
      },
      marginBottom: 50,
    },
    "& > p": {
      color: "#ffffff",
      opacity: "0.75",
    },
  },
  arrowMarks: {
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      "& > img": {
        width: "85%",
      },
    },
    "& > img": {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto",
    },
  },
  
    headingStyle:{
      paddingBottom: "10px",
      textTransform:"uppercase",
      position:"relative",
      fontSize:30,
      fontWeight:'900 !important',
      "&:after" :{
        content: '""',
        background: "#FAA906",
        position: "absolute",
        bottom: 0,
        left: "calc(50% - 25px)",
        height: "4px",
        width: "50px",
      }
    
    }
}));
