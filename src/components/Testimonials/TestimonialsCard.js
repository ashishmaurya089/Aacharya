import React,{useState} from "react";
import Carousel from "react-multi-carousel";
import { makeStyles } from "@material-ui/core/styles";
import { FormatQuote } from "@material-ui/icons";

import { CustomButtonGroup } from "../../utils/CustomButtonGroup";
import TestimonialText from "./testimonialText";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 3000, min: 1480 },
    items: 3,
  },
  appleDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 1480, min: 1200 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1200, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#fff",
  },
  
  branch: {
    color: "#868e96",
  },
  details: {
    height: 54,
  },
}));

function TestimonialsCard({ data }) {
  const classes = useStyles();
  
  return (
    <>
      <Carousel
        responsive={responsive}
        arrows={false}
        renderButtonGroupOutside={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        autoPlay
        autoPlaySpeed={3000}
        customButtonGroup={<CustomButtonGroup />}
        infinite
      >
        {data.map((testi, i) => (
          <div className={`item mx-2 ${classes.root}`} key={i}>
            <div className="testimony-wrap text-center">
              <div
                className="user-img mb-5"
                style={{
                  backgroundImage: `url(${testi.img})`,
                  marginTop: 0,
                }}
              >
                <span className="quote d-flex align-items-center justify-content-center">
                  <FormatQuote className={classes.icon} />
                </span>
              </div>
              <div >
                <TestimonialText text={testi.text} />
		
                <div className={classes.details}>
                  <p className="name">{testi.name}</p>
                  <span className={`position ${classes.branch}`}>
                    {testi.branch}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default TestimonialsCard;
