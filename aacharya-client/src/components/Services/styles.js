import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  segIcon: {
    height: 100,
  },
  tagline: {
    [theme.breakpoints.up("sm")]: {
      fontSize: 20,
    },
    padding: "0 20px",
  },
  aBox: {
    // display: 'inline-block',
    margin: "0 auto",
    width: 280,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  imgContainer: {
    height: 180,
    overflow: "hidden",
    borderRadius: "0 0 20px 20px",
    display: "inline-block",
  },
  innerSkew: {
    display: "inline-block",
    borderRadius: 10,
    overflow: "hidden",
    padding: 0,
    // transform: 'skew(0deg, 13deg)',
    fontSize: 0,
    // background: '#c8c2c2',
    /* margin: 30px 0px 0px 0px, */
    margin: "35px 0 0 0",
    /* height: 250px, */
    // width: 200,
    "& > img": {
      // transform: 'skew(0deg, -13deg)',
      /* height: 250px,
      margin: -35px 0px 0px -70px, */
      height: 100,
      width: "auto",
    },
  },
  textContainer: {
    boxShadow: "0 0 10px 0 rgba(250, 169, 6)",
    padding: "80px 20px 20px 20px",
    borderRadius: 20,
    background: "#fff",
    margin: "-120px 0 0 0",
    lineHeight: "19px",
    fontSize: "14px",
    "& > h3": {
      margin: "20px 0 10px 0",
      color: "#000",
      fontSize: "20px",
    },
    "&:hover": {
      boxShadow: "0 0 10px 0 rgba(255, 6, 6, 0.2)",
    },
  },
  button: {
    color: "#fff",
    border: "1px solid #faa906",
    background: "#faa906",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "25px",
    borderRadius: "30px",
  },
  desc: {
    color: "#4B4B4B",
    fontSize: "12px",
    fontWeight: 400,
  },
  headerStyle: {
    paddingBottom: "10px",
    textTransform: "uppercase",
    position: "relative",
    fontSize: 30,
    fontWeight: "bold",
    "&:after": {
      content: '""',
      background: "#FAA906",
      position: "absolute",
      bottom: 0,
      left: "calc(50% - 25px)",
      height: "4px",
      width: "50px",
    }
  },
}));
