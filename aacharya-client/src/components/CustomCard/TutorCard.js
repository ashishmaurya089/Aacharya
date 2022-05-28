import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import ProgressBar from "../ProgressBar";
import axios from "../../axios";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllTutors } from "../../actions/tutorActions";
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';
import NoItemsFound from "../../components/NoItemsFound";
function TutorCard({ basePath }) {
  const history = useHistory();
  const { totalTopTutor } = useSelector((state) => state.tutorsData);
  const [tutorData, setTutorData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const { user } = useSelector(
    (state) => state.usersData
  );
  const getTopTutor = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/tutors/getTutors`, {
        page,
        perPage: 12,
      });
      setTutorData([...tutorData, ...data.data]);
      setLoading(false);
    } catch (err) {
      toast.error("something went wrong");
      setLoading(false);
    }
  };
  useEffect(() => {
    getTopTutor();
  }, [page]);
  useEffect(() => {
    var pageCnt = Math.floor(totalTopTutor / 12);
    setPageCount(pageCnt);
  }, [totalTopTutor]);
  // useEffect(() => {
  //   setTutorData([...tutorData, ...tutors]);
  // }, [tutors]);
  const handlePageChange = () => {
    setPage(page + 1);
  };

  const handlePageChangeCard = (e) => {
    debugger
    let TeacherId = e
    if (user == null) {
      setLogin(true)
    } else {
      history.push(`${basePath}/${TeacherId}`);
      setLogin(false)
    }


  };
  const classes = useStyles();
  const handleTeachingPre = (value) => {
    let display = "";
    if (value.offersOnline) {
      display = "Online";
    }
    if (value?.offlineLocationPreference?.studentHome) {
      display =
        display == "" ? display + "Student Home" : display + " , Student Home";
    }
    if (value?.offlineLocationPreference?.tutorHome) {
      display =
        display == "" ? display + "Tutor Home" : display + " , Tutor Home";
    }
    if (value?.offlineLocationPreference?.center) {
      display =
        display == ""
          ? display + "Aacharya Center"
          : display + " , Aacharya Center";
    }
    return display;
  };
  const handleDegreeBranch = (value) => {
    let display = "";
    if (value.special_degrees.hasDegree) {
      display = `( ${value.special_degrees.branch} )`;
      return display;
    } else if (value.pg.hasDegree) {
      display = `( ${value.pg.branch} )`;
      return display;
    } else if (value.ug.hasDegree) {
      display = `( ${value.ug.branch} )`;
      return display;
    }
  };
  const handleContactAddress = (value) => {
    let address = JSON.parse(value.communicationAddress);
    return `${address.Locality}, ${address.City}`;
  };
  return (
    <>
      {!login ? (
      <Container maxWidth="lg" fixed>
        <Grid container spacing={2} className="my-3">
          {tutorData &&
            tutorData.length > 0 &&
            tutorData.map((value) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={value._id}
                className="mx-auto"
              >
                <div onClick={() => handlePageChangeCard(value.userId._id)}    >
                  <div className={`staff m-2 pb-0 ${classes.tutor}`}>
                    <div className={classes.tutorBackdrop}></div>
                    <div
                      className={`img ${classes.tutorImg}`}
                      style={{
                        backgroundImage: `url(${value.userId && value.userId.profileImage
                          })`,
                      }}
                    ></div>
                    <div className={`info ${classes.tutorInfo}`}>
                      <h3 className="mt-2" className={classes.noWrap}>
                        {value.name}
                      </h3>
                      <span className="position">
                        <i className="fas fa-graduation-cap"></i>{" "}
                        {value.ug.hasDegree && `${value.ug.name}`}
                        {value.pg.hasDegree && `, ${value.pg.name}`}
                        {value.special_degrees.hasDegree &&
                          `, ${value.special_degrees.name}`}
                      </span>
                      <span className="position">
                        <i className="fas fa-user-graduate"></i>{" "}
                        {handleDegreeBranch(value)}
                      </span>
                      <span className="position" className={classes.noWrap} style={{}}>
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {handleContactAddress(value)}
                      </span>
                      <span className="position">
                        <i className="fas fa-user"></i> Availability:{" "}
                        {handleTeachingPre(value)}
                      </span>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
        </Grid>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          {loading ? (
            <ProgressBar />
          ) : page < pageCount ? (
            <Button
              variant="outlined"
              color="primary"
              style={{ fontSize: "3vh" }}
              onClick={handlePageChange}
            >
              See more
            </Button>
          ) : null}
        </div>
        {/* <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
          /> */}
      </Container>
       ) 
      : (
        <NoItemsFound
        dialogline="Please Login!"
      />
      )} 
    </>
  );
}

export default TutorCard;
