import React from "react";
import { Container, Grid } from "@material-ui/core";

import ArrowOdd from "./assets/arrowOdd.svg";
import ArrowEven from "./assets/arrowEven.svg";

import useStyles from "./styles";

export default function WorkFlow() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.workflow}>
        <section className="ftco-section testimony-section">
          <div className="container">
            <div className="row justify-content-center ">
              <div className="col-md-7 heading-section ftco-animate text-center">
                <h2 className={classes.headingStyle}>How aacharya works?</h2>
                {/* <p>Let’s see how it works</p> */}
              </div>
            </div>
          </div>
        </section>
        <Container maxWidth="md">
          <Grid container>
            <Grid
              item
              xs={12}
              sm={2}
              md={2}
              className={classes.workFlowContent}
            >
              <div className={classes.step}>
                <h2 >Step 1</h2>
              </div>
              <h2>
                <i className="fas fa-search"></i> Search & Select the subject
              </h2>
              {/* <p>Book a Free Demo Class with a Tutor</p> */}
            </Grid>
            <Grid item xs={12} sm={3} md={3} className={classes.arrowMarks}>
              <img src={ArrowOdd} alt="" />
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              md={2}
              className={classes.workFlowContent}
            >
              <div className={classes.step}>
                <h2 >Step 2</h2>
              </div>
              <h2>
                <i className="fas fa-chalkboard-teacher"></i> See all the tutor
                profiles available
              </h2>
              {/* <p>Attend the Demo class as scheduled</p> */}
            </Grid>
            <Grid item xs={12} sm={3} md={3} className={classes.arrowMarks}>
              <img src={ArrowEven} alt="" />
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              md={2}
              className={classes.workFlowContent}
            >
              <div className={classes.step}>
                <h2>Step 3</h2>
              </div>
              <h2>
                <i className="fas fa-phone-alt"></i> Contact tutor via message
                or call
              </h2>
              {/* <p>Use SecurePay and start your class</p> */}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
