import React from "react";
import { Link,useHistory } from "react-router-dom";

// Images
import bgImg from "../../images/bg_2.jpg";
import blogTopImage from "../../images/image_1.jpg";
import blogBtmImage from "../../images/image_2.jpg";
import logo from "../../images/aacharya.png";
import { useDispatch } from "react-redux";

import "./Footer.css";
import useStyles from "./styles";
import { Button } from "@material-ui/core";

function Footer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  dispatch({
    type: "SELECT_SEGMENT",
    payload: "6112ae189a24cc0ed7984a14",
  });
  const handleQuickLink = (id)=>{
    dispatch({
      type: "SELECT_LEVEL",
      payload: id,
    });
    history.push('/stream');
  }
  return (
    <>
      <footer
        className="ftco-footer ftco-bg-dark ftco-section img"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-4">
              <div className="ftco-footer-widget mb-4">
                <a href="/">
                  <img
                    src={logo}
                    alt="logo"
                    className={`${classes.logo} mb-2`}
                  />
                </a>
                <p>
                  Aacharya is an online search platform that connects a student
                  with a teacher nearby for his/her knowledge enhancement in a
                  particular stream/area/subject.
                </p>
                <h4 className="mt-5">Follow us</h4>
                <ul className="ftco-footer-social list-unstyled float-md-left float-lft ">
                  <li className="ftco-animate">
                    <Link to={{pathname:"https://twitter.com/AacharyaNet"}} target="_blank">
                      <span className="fab fa-twitter"></span>
                    </Link>
                  </li>
                  <li className="ftco-animate">
                    <Link to={{pathname:"https://www.facebook.com/Aacharya.net/"}} target="_blank">
                      <span className="fab fa-facebook"></span>
                    </Link>
                  </li>
                  <li className="ftco-animate">
                    <Link to={{pathname:"https://instagram.com/find_teacher_nearby?utm_medium=copy_link"}} target="_blank">
                      <span className="fab fa-instagram"></span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className='col-md-4'>
							<div className='ftco-footer-widget mb-4'>
								<h2 className='ftco-heading-2'>Recent Blog</h2>
								<div className='block-21 mb-4 d-flex'>
									<Link
										to
										className='blog-img mr-4'
										style={{ backgroundImage: `url(${blogTopImage})` }}
									></Link>
									<div className='text'>
										<h3 className='heading'>
											<Link to='/'>
												Even the all-powerful Pointing has no control about
											</Link>
										</h3>
										<div className='meta'>
											<div>
												<Link to='/'>
													<span className='icon-calendar'></span> July 12, 2018
												</Link>
											</div>
											<div>
												<Link to='/'>
													<span className='icon-person'></span> Admin
												</Link>
											</div>
											<div>
												<Link to='/'>
													<span className='icon-chat'></span> 19
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className='block-21 mb-4 d-flex'>
									<Link
										to
										className='blog-img mr-4'
										style={{ backgroundImage: `url(${blogBtmImage})` }}
									></Link>
									<div className='text'>
										<h3 className='heading'>
											<Link to='/'>
												Even the all-powerful Pointing has no control about
											</Link>
										</h3>
										<div className='meta'>
											<div>
												<Link to='/'>
													<span className='icon-calendar'></span> July 12, 2018
												</Link>
											</div>
											<div>
												<Link to='/'>
													<span className='icon-person'></span> Admin
												</Link>
											</div>
											<div>
												<Link to='/'>
													<span className='icon-chat'></span> 19
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> */}
            <div className="col-md-2">
              <div className="ftco-footer-widget mb-4 ml-md-4">
                <h2 className="ftco-heading-2">Site Links</h2>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/" className="py-2 d-block">
                      <span className="fas fa-angle-right"></span> Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="py-2 d-block">
                      <span className="fas fa-angle-right"></span> About
                    </Link>
                  </li>
                  <li>
                    <Link to="/tutors" className="py-2 d-block">
                      <span className="fas fa-angle-right"></span> Find Tutors
                    </Link>
                  </li>
                  <li>
                    <Link to="/competitions" className="py-2 d-block">
                      <span className="fas fa-angle-right"></span> Competitions
                    </Link>
                  </li>
                  <li>
                    <Link to="/skills" className="py-2 d-block">
                      <span className="fas fa-angle-right"></span> Skills
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="ftco-footer-widget mb-4 ml-md-4">
                <h2 className="ftco-heading-2">Quick Links</h2>
                <ul className="list-unstyled">
                  <li>
                    <Button   className={`py-2 d-block ${classes.quickLink}`}   onClick={handleQuickLink.bind(this,"6112b185ad0fa210936a3363")}>
                      <span className="fas fa-angle-right"></span> School
                      Tutions
                    </Button>
                  </li>
                  <li>
                    <Button  onClick={handleQuickLink.bind(this,"6112c7d9548fd7215ee71c85")}  className={`py-2 d-block ${classes.quickLink}`}>
                      <span className="fas fa-angle-right"></span> Diploma
                      Tutions
                    </Button>
                  </li>
                  <li>
                    <Button onClick={handleQuickLink.bind(this,"6112ccb0a2ad44233cbd8e31")}  className={`py-2 d-block ${classes.quickLink}`}>
                      <span className="fas fa-angle-right"></span> B.Tech/B.E
                      Tutions
                    </Button>
                  </li>
                  <li>
                    <Button  onClick={handleQuickLink.bind(this,"611348e75e52e52c05c05366")}  className={`py-2 d-block ${classes.quickLink}`}>
                      <span className="fas fa-angle-right"></span> M.Tech/M.E
                      Tuitions
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Reach Us</h2>
                <div className="block-23 mb-3">
                  <ul>
                    <li>
                      <i className="fas fa-location-arrow"></i>
                      <span className="text">
                        Flat.No.A2, Sri Vijaya Nilayam, Hanumaiah street,
                        Bhavanipuram, Vijayawada, Andhra Pradesh, India, 520012
                      </span>
                    </li>
                    <li>
                      <i className="fas fa-phone-alt"></i>
                      <span className="text">+91 7386141814</span>
                    </li>
                    <li>
                      <i className="fas fa-envelope"></i>
                      <span className="text">info@aacharya.net</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <p>
                Copyright &copy; {new Date().getFullYear()} All rights reserved
                | Developed by{" "}
                <Link
                  to={{ pathname: "https://techpranee.com/" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  TechPranee
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* <div id='ftco-loader' className='show fullscreen'>
				<svg className='circular' width='48px' height='48px'>
					<circle
						className='path-bg'
						cx='24'
						cy='24'
						r='22'
						fill='none'
						stroke-width='4'
						stroke='#eeeeee'
					/>
					<circle
						className='path'
						cx='24'
						cy='24'
						r='22'
						fill='none'
						stroke-width='4'
						stroke-miterlimit='10'
						stroke='#F96D00'
					/>
				</svg>
			</div> */}
    </>
  );
}

export default Footer;
