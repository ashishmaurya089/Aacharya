import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";

import ProgressBar from "../ProgressBar";
import SeeMoreCard from "../CustomCard/SeeMoreCard";

import useStyles from "./styles";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 3000, min: 1600 },
    items: 3,
    partialVisibilityGutter: 10,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1200 },
    items: 3,
    partialVisibilityGutter: 50,
  },
  tablet: {
    breakpoint: { max: 1200, min: 900 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 550, min: 0 },
    items: 1.25,
    // partialVisibilityGutter: 60,
  },
};

function TutorCarouselCard({ data, loading, heading, tagline, basePath }) {
  const classes = useStyles();
  const handleTeachingPre = (value) => {

    let display = "";
    if (value.offersOnline) {
      display = "Online";
     
    }
   

    if (value?.offlineLocationPreference?.studentHome) {
      
      display = display == "" ? display + "Student Home" : display + " , Student Home";
      
    }  if (value?.offlineLocationPreference?.tutorHome) {
      
      display = display == "" ? display + "Tutor Home" : display + " , Tutor Home";
      
    } if (value?.offlineLocationPreference?.center){
     
      display = display == "" ? display + "Aacharya Center" : display + " , Aacharya Center";
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
    var address = JSON.parse(value.communicationAddress);
    return `${address.Locality}, ${address.City}`;
  };
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 heading-section ftco-animate text-center">
              <h2 className={classes.headingStyle}>{heading}</h2>
              <p className={classes.tagline}>{tagline}</p>
            </div>
          </div>

          <SeeMoreCard type="tutors" />

          {!loading ? (
            <Carousel
              responsive={responsive}
              removeArrowOnDeviceType={["mobile"]}
              partialVisbile

            >
              {data &&
                data.length > 0 &&
                data.map((value) => (
                  <Link to={`${basePath}/${value.userId._id}`} key={value._id}>
                    <div className={`staff  pb-0 ${classes.tutor}`}>
                      <div className={classes.tutorBackdrop}></div>
                      <div
                        className={`img ${classes.tutorImg}`}
                        style={{
                          backgroundImage: `url(${value.userId && value.userId.profileImage
                            })`,
                        }}
                      ></div>
                      <div className={`info ${classes.tutorInfo}`}>
                        <h3 className="mt-2" className={classes.noWrap}>{`${value.userId && value.userId.salutation}${value.name}`}</h3>
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
                        <span className="position" className={classes.noWrap}>
                          <i className="fas fa-map-marker-alt"></i>{" "}
                          {handleContactAddress(value)}
                        </span>
                        <span className="position">
                          <i className="fas fa-user"></i> Availability:{" "}
                          {handleTeachingPre(value)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </Carousel>
          ) : (
            <ProgressBar />
          )}
        </div>
      </section>
    </>
  );
}

export default TutorCarouselCard;
