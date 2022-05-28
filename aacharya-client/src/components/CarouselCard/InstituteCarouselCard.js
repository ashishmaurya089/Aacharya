import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from "@material-ui/core";

import useStyles from "./styles";

import ProgressBar from "../ProgressBar";
import SeeMoreCard from "../CustomCard/SeeMoreCard";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 1920, min: 1280 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1280, min: 960 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 960, min: 768 },
    items: 2,
  },
  smallTablet: {
    breakpoint: { max: 768, min: 600 },
    items: 1,
    partialVisibilityGutter: 30
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    partialVisibilityGutter: 30
  },
};

function InstituteCarouselCard({ data, loading, heading, tagline, basePath }) {
  const classes = useStyles();

  const handleContactAddress = (value) => {
    let address = JSON.parse(value.communicationAddress);
    return (
      <p
        className={classes.ctcAddress}
      >{`${address.Locality}, ${address.City}`}</p>
    );
  };
  return (
    <>
      <section className="ftco-section ">
       <div>
          <Grid Container  style={{textAlign:'center'}}>
            {/* <div className="col-md-7 heading-section ftco-animate text-center"> */}
            <Grid item  >
              <h2 className={classes.headingStyle}>{heading}</h2>
              <p className={classes.tagline}>{tagline}</p>
              </Grid>
            {/* </div> */}
          </Grid>

          <SeeMoreCard type="institutes" />

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
                    <Card className={classes.instRoot}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={value.instituteName}
                          image={value.instituteBackdrop}
                          title={value.instituteName}
                          className={classes.instBackdrop}
                        />
                        <CardContent className={classes.instContent}>
                          <img
                            className={classes.instLogoImg}
                            src={value.instituteLogo}
                            alt={value.instituteName}
                          />
                          <Typography gutterBottom variant="h5" component="h2">
                            {value.instituteName}
                          </Typography>
                          {handleContactAddress(value)}
                        </CardContent>
                      </CardActionArea>
                    </Card>
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

export default InstituteCarouselCard;
