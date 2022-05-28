import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Container } from "@material-ui/core";
import { getSegments } from "../../actions/subjectActions";
import MobileCard from "./MobileCard";

import useStyles from "./styles";

function Services({ color, type, heading, tagline }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { segments, levels } = useSelector((state) => state.subjectsData);

  useEffect(() => {
    dispatch(getSegments());
  }, []);
  const handleSelected = (id) => {
    dispatch({
      type: "SELECT_SEGMENT",
      payload: id,
    });
  };
  return (
    <>
      {/* <section className='ftco-section'>
				<div className='container'>
					<div className='row'>
						{segments.map((seg) => (
							<div
								className='col-md-4 col-sm-4 col-xs-6 align-self-stretch ftco-animate'
								key={seg._id}
							>
								<Link to={`/levels`}>
									<div
										className='media block-6 services p-3 py-4 d-block text-center'
										onClick={() => handleSelected(seg._id)}
									>
										<div className='icon d-flex justify-content-center align-items-center mb-3'>
											<img
												src={seg.icon}
												alt={seg.name}
												className={classes.segIcon}
											/>
										</div>
										<div className='media-body px-3'>
											<h3 className='heading'>{seg.name}</h3>
											 <p>{seg.description}</p> 
										</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</section> */}

      <section className="ftco-section" style={{ background: `${color}` }}>
        <Container maxWidth="lg">
          <Grid container justifyContent='center'>
            {/* <div className="col-md-7 heading-section ftco-animate text-center"> */}
            <Grid item xs={12} sm={8} style={{ textAlign: 'center' }}>
              <h2 className={classes.headerStyle}>SERVICES</h2>
              <p className={classes.tagline}>
                Find qualified and experienced tutor nearby for offline home
                tuition or for live online tuition
              </p>
            </Grid>
          </Grid>

          <Grid container justifyContent='center' >
            {segments.map((seg) => (
              <Grid item xs={6} sm={3}
                // className="col-lg-3 col-md-4 col-sm-6 col-xs-6 mx-auto"
                key={seg._id}
              >
                <Link
                  to={type === "providerlevel" ? `/providerlevel` : `/levels`}
                >
                  <div
                    className={classes.aBox}
                    onClick={() => handleSelected(seg._id)}
                  >
                    <div className={classes.imgContainer}>
                      <div className="img-inner">
                        <div className={classes.innerSkew}>
                          <img src={seg.icon} alt="img" />
                        </div>
                      </div>
                    </div>
                    <div className={classes.textContainer}>
                      <h3>{seg.name}</h3>
                      <p className={classes.desc}>{seg.description}</p>
                      <button className={classes.button}>Explore More</button>
                    </div>
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
          <MobileCard data={segments} type={type} />
        </Container>
      </section>
    </>
  );
}

export default Services;
