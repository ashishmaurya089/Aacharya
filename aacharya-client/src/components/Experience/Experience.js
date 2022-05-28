import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import CountUp from "react-countup";
import { useHistory } from "react-router";

import bgImg from "../../images/bg_3.jpg";

import "./Experience.css";

const useStyle = makeStyles((theme)=>({
	button: {
		// fontSize: 22,
		// border: `1px solid  ${theme.palette.primary.main}`,
		// background: theme.palette.primary.main,
		color: '#fff',
		paddingTop: '1rem',
		paddingBottom: '1rem',
		paddingLeft: '35px',
		paddingRight: '35px',
		borderRadius: '50px',
		[theme.breakpoints.down('sm')]: {
			display: 'block',
			margin: '0 auto',
		},
	},
}));
function Experience({ color }) {
	const history = useHistory();
	const classes = useStyle();
  return (
    <div style={{ background: color }}>
      <section
        className="ftco-section-3 img"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row d-md-flex justify-content-center">
            <div className="col-md-9 about-video text-center">
              <h2 className="ftco-animate">
                15 Years of Excellence in Education
              </h2>
              <h3 className="ftco-animate" style={{ color: " #fff" }}>
                Thousands of students, parents and teachers trust Aacharya
              </h3>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
		onClick={()=>history.push('/about')}
              >
                More about Aacharya
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-counter" id="section-counter">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div className="block-18 text-center">
                    <div className="text">
                      <strong className="number" data-number="7568">
                        <CountUp end={7568} duration={5} className="count" />
                      </strong>
                      <span className="quoteline">
                        Qualified teachers & <br /> Industry experts
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div className="block-18 text-center">
                    <div className="text">
                      <strong className="number" data-number="9878">
                        <CountUp end={9878} duration={5} className="count" />
                      </strong>
                      <span className="quoteline">Subjects</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div className="block-18 text-center">
                    <div className="text">
                      <strong className="number" data-number="29878">
                        <CountUp end={29878} duration={5} className="count" />
                      </strong>
                      <span className="quoteline">
                        Students & Parents <br />
                        across the country
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div className="block-18 text-center">
                    <div className="text">
                      <strong className="number" data-number="2468">
                        <CountUp end={2468} duration={5} className="count" />
                      </strong>
                      <span className="quoteline">
                        Students gained core skills
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Experience;
