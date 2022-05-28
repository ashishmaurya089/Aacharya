import React from "react";
import { Link } from "react-router-dom";

// Images
import bredImg from "../../images/bg_2.jpg";
import personImgOne from "../../images/team1.jpg";
import personImgTwo from "../../images/team2.jpg";
import personImgThree from "../../images/team3.jpg";
import personImg4 from "../../images/person_4.jpg";
import personImg5 from "../../images/person_5.jpg";
import TestimonialText from "../../components/Testimonials/testimonialText";

function Team() {
  return (
    <>
      {/* <div
				className='hero-wrap hero-wrap-2'
				style={{
					backgroundImage: `url(${bredImg})`,
					backgroundAttachment: 'fixed',
				}}
			>
				<div className='overlay'></div>
				<div className='container'>
					<div
						className='row no-gutters slider-text align-items-center justify-content-center'
						data-scrollax-parent='true'
					>
						<div className='col-md-8 ftco-animate text-center'>
							<h2 className='mb-3 bread'>- Visit Our Team -</h2>
							<p>About team description or shot note appears here.</p>
						</div>
					</div>
				</div>
			</div> */}

      <section className="ftco-section bg-light">
        <div className="container">
          {/* <div className='row justify-content-center mb-5 pb-3'>
						<div className='col-md-7 heading-section ftco-animate text-center'>
							<h2 className='mb-4'>Our Experience Advisor</h2>
						</div>
					</div> */}
          <div className="row">
            <div className="col-lg-12 ftco-animate">
              <div className="staff">
                <div className="d-flex mb-4">
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${personImgOne})` }}
                  ></div>
                  <div className="info ml-4">
                    <h3>Dr. Rajesh Gunti,</h3>
                    <span className="position">
                      M.Tech, Ph.D (Mechanical Engineering)
                    </span>
                    <span className="position">
                      <h6>Founder, Aacharya</h6>
                    </span>
                    <p className="ftco-social d-flex">
                      <Link
                        to={{
                          pathname:
                            "https://www.linkedin.com/in/dr-rajesh-gunti-5a350baa",
                        }}
                        className="d-flex justify-content-center align-items-center"
                        target="_blank"
                      >
                        {/* <i className='fab fa-linkedin'></i> */}
                        <img src="https://img.icons8.com/material-outlined/24/000000/linkedin--v2.png" />
                        {/* <a href="https://icons8.com/icon/Uj9DyJeLazL6/linkedin"></a> */}
                      </Link>
                      <Link
                        to={{
                          pathname:
                            "https://scholar.google.com/citations?hl=en&user=7XdUY94AAAAJ",
                        }}
                        className="d-flex justify-content-center align-items-center"
                        target="_blank"
                      >
                        {/* <span className='fab fa-google'></span> */}
                        <img src="https://img.icons8.com/material/24/000000/google-scholar--v2.png" />
                        {/* <a href="https://icons8.com/icon/Vtn3wxdq5EtE/google-scholar"></a> */}
                      </Link>
                      <Link
                        to={{
                          pathname: "https://www.facebook.com/professorrajesh",
                        }}
                        className="d-flex justify-content-center align-items-center"
                        target="_blank"
                      >
                        {/* <span className='fab fa-facebook'></span> */}
                        <img src="https://img.icons8.com/material-outlined/30/000000/facebook-new.png" />
                        {/* <a href="https://icons8.com/icon/118487/facebook"></a> */}
                      </Link>
                      <Link
                        to={{
                          pathname:
                            "https://www.instagram.com/professor_rajesh_gunti/",
                        }}
                        className="d-flex justify-content-center align-items-center"
                        target="_blank"
                      >
                        {/* <span className='fab fa-instagram'></span> */}
                        <img src="https://img.icons8.com/material-outlined/24/000000/instagram-new--v2.png" />
                        {/* <a href="https://icons8.com/icon/xQDoK3WxHJ8O/instagram"></a> */}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="text">
                  <p style={{ textAlign: "justify" }}>
                    <span
                      className="position mb-2"
                      style={{ textAlign: "justify" }}
                    >
                      Dr.Rajesh Gunti is born in Nandigama village, Krishna
                      District of Andhra Pradesh state, and brought up in
                      Vijayawada city, Andhra Pradesh. Did schooling at
                      Vijayawada in 1997, and later completed intermediate at
                      Andhra Loyola College in 1999. Graduated (B.Tech) in
                      Production Engineering from VR Siddhartha Engineering
                      College, Vijayawada in 2003. Later joined in RAP
                      Industries and worked for one year as quality control
                      engineer in the industry. Completed Post-graduation
                      (M.Tech) in Production Engineering under Acharya Nagarjuna
                      University in 2006. Received Doctoral Degree (Ph.D) in
                      Mechanical Engineering from JNTU Hyderabad for research on
                      “Experimental Investigation on Natural Fiber composites”
                      on 1st October 2016.
                    </span>
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    <span
                      className="position mb-2"
                      style={{ textAlign: "justify" }}
                    >
                      Dr. Rajesh Gunti Started his teaching career at DVR &
                      Dr.HS MIC College of Technology, Kanchikacherla as
                      Assistant Professor in 2006 and served in various
                      capacities such as Head of the Department of Mechanical
                      Engineering, Head of Diploma Courses, ISO MR, NBA & NAAC
                      Coordinator, NSS Programme officer etc. with a total
                      teaching experience of 15 years.{" "}
                    </span>
                  </p>
                  <p>
                    <b>Patents:</b>
                  </p>
                  <ul>
                    <li>
                      Published patent on Biodegradable Composite Edge Protector
                    </li>
                    <li>
                      Published patent on Biodegradable Composite Tooth Brush.
                    </li>
                  </ul>

                  <p>
                    <b>International Publications:</b>
                  </p>
                  <ul>
                    <li>
                      Published 10 research papers in Scopus and SCI indexed
                      international journals with Thomson Reuters impact factor
                      and 5 papers in other AICTE/UGC approved international
                      journals.
                    </li>
                  </ul>
                  <p>
                    <b>International Conferences: </b>
                  </p>
                  <ul>
                    <li>
                      Presented research work in 12 International Conferences at
                      various reputed organizations such as IIT Kharagpur, NIT
                      Karnataka, NIT Trichy, VIT, Aacharya Nagarjuna University
                      etc.
                    </li>
                  </ul>

                  <p>
                    <b>Awards: </b>
                  </p>

                  <ul>
                    <li>
                      Received Best Research paper award in an internation
                      conference held at SCSVMV University
                    </li>
                    <li>
                      Received University level best NSS Programme officer in
                      2012 at JNTUK,
                    </li>
                    <li>
                      {" "}
                      Received college level best teacher award in 2010 from MIC
                      College of Technology
                    </li>
                    <li>
                      {" "}
                      Received best teacher award at department level in 2008
                      from MIC College of Technology
                    </li>
                  </ul>

                  <p>
                    <b> International Visits: </b>
                  </p>

                  <ul>
                    <li>
                      Visited Germany as part of Indo-German International Youth
                      Exchange Program in 2006
                    </li>
                  </ul>

                  <p>
                    <b>Guest Talks: </b>
                  </p>

                  <ul>
                    <li>
                      Delivered about 100 guest lectures on topics such as
                      “Principles of Engineering Drawing, Composite Materials
                      and Career Prospects for Engineers” at various engineering
                      colleges in Andhra Pradesh and other states of the country
                    </li>
                  </ul>

                  <p>
                    <b>Current status: </b>
                  </p>

                  <ul>
                    <li>
                      Currently, working as Professor in the Department of
                      Mechanical Engineering at DVR & Dr.HS MIC College of
                      Technology, Kanchikacherla with a total experience of 14
                      years in teaching.
                    </li>
                    <li>
                      With a noble intention of providing part time employment
                      to thousands of qualified teachers and sharing knowledge
                      to lakhs of students, Aacharya (Aacharya.net) is launched
                      in 2019.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className='ftco-freeTrial'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='d-flex align-items-center'>
								<div className='free-trial ftco-animate'>
									<h3>Try our free trial course</h3>
									<p>
										Even the all-powerful Pointing has no control about the
										blind texts it is an almost unorthographic life
									</p>
								</div>
								<div className='btn-join ftco-animate'>
									<p>
										<Link to='#' className='btn btn-primary py-3 px-4'>
											Join now!
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section> */}
    </>
  );
}

export default Team;
