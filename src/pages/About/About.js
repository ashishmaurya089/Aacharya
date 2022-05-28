import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Team from "../TeamMembers/Team";

import topImg from "../../images/bg_2.jpg";
import cntImg from "../../images/about_img.jpg";
import cntImg2 from "../../images/about_img2.jpg";

import "./About.module.css";
import useStyles from "./styles";

function About() {
  const classes = useStyles();
  const [state, setstate] = useState("about");
  return (
    <>
      <div
        className={`hero-wrap hero-wrap-2 ${classes.aboutImg}`}
        style={{
          backgroundImage: `url(${topImg})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div
            className={`row no-gutters slider-text align-items-center justify-content-center ${classes.aboutContent}`}
            data-scrollax-parent="true"
          >
            <div className="col-md-8 ftco-animate text-center">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">Home</a>
                </span>{" "}
                <span>About</span>
              </p>
              {/* <h2 className='mb-3 bread'>- About Aacharya -</h2>
							<p>
								Aacharya is an online search platform that connects a student
								with an expert teacher nearby for knowledge enhancement in a
								particular stream/area/subject.
							</p> */}

              <Button
                variant="contained"
                color="secondary"
                onClick={() => setstate("about")}
                className="mx-2 px-5 my-2"
                size="large"
              >
                About
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setstate("team")}
                className="mx-2 px-5"
                size="large"
              >
                Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      {state === "about" ? (
        <section className="ftco-section aboutsection">
          <div className="container">
            <div className="row d-flex">
              <div className="col-md-12 pl-md-5 ftco-animate">
                <h3>Welcome to Aacharya</h3>
                <span>
                  <b>India's First Teacher Appointment Booking Website.</b>
                </span>
                <br />
                <br />
                <p>
                  Aacharya is an online search platform that connects a student
                  with a qualified and expert teacher nearby for knowledge
                  enhancement in a particular stream/area/subject. Aacharya is
                  the India’s first teacher appointment booking website and app
                  founded by Dr. Rajesh Gunti, a Professor in Mechanical
                  Engineering by profession.
                </p>
                <p>
                  Through Aacharya, a student or parent can select a subject and
                  search teacher nearby their location. Aacharya will show the
                  availability of teachers and they can contact teachers via
                  message or call and book a direct appointment based on the
                  teacher’s availability, qualification, and fee. The parents
                  and students can also post a requirement in the portal and the
                  requirement will be sent to all the teachers available in the
                  Aacharya portal so that teachers can contact parents.{" "}
                </p>
              </div>
              <div className="col-md-12 pl-md-5 ftco-animate list-item">
                <h4>Student’s Need</h4>
                <p>
                  There are many instances where the students are getting access
                  to inferior sources of knowledge such as
                </p>
                <ul>
                  <li>
                    <i className="fas fa-angle-right"></i>Many schools/colleges
                    are running short of faculty
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Many schools/colleges
                    are running with less qualified teachers
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Many schools/colleges
                    are running with low infrastructure or facilities.
                  </li>
                </ul>
                <p>
                  Under these circumstances, the students are getting inferior
                  knowledge during their stay in the institutes.
                </p>
                <p>
                  It is very important for a student to get ample knowledge by
                  the end of schooling/graduation, to get ready for the next
                  stage of life, without any gaps in the teaching-learning
                  process.
                </p>
              </div>
              <div className="col-md-12 pl-md-5 ftco-animate">
                <h4>Faculty’s Need</h4>
                <ul>
                  <li>
                    <i className="fas fa-angle-right"></i>There are cases where
                    the teacher is not paid for the skills/knowledge that he/she
                    possesses.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>There are cases where
                    the teacher is not paid for the qualification that he has.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>There are cases where
                    the teacher is not paid regularly by many private
                    schools/colleges/institutions due to shortage of funds.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>There are many people
                    who are jobless, though they are qualified and skilled.
                  </li>
                </ul>
                <p>
                  There is a definite need of a source that can generate income
                  by sharing their knowledge and lead comfortable life.
                </p>
              </div>
              <div className="col-md-12 pl-md-5 ftco-animate">
                <h4>Industry Need</h4>
                <p>
                  Sometimes, the students have to learn the subject not only for
                  examination but also for gaining full knowledge to meet the
                  future requirements. Also, there is a need for students to
                  become industry-ready with advanced skills. It may not be
                  possible to gain full knowledge of a subject and it is also
                  impossible to meet industry requirements with the current
                  curriculum.
                </p>
              </div>
              <div className="col-md-12 pl-md-5 ftco-animate">
                <h4>One Step Solution To Student-teacher Need:</h4>
                <p>
                  AACHARYA can make the needy students identify an expert
                  teacher who is very nearby and can connect with each other on
                  a payment basis. This can solve the student’s need of finding
                  the right teacher and the teacher’s need for additional
                  revenue by sharing the knowledge he/she has. This online
                  platform can introduce industry experts also to the students
                  so as to become industry-ready.
                </p>
              </div>
              <div className="col-md-12 pl-md-5 ftco-animate">
                <h4>How Aacharya Works For Student?</h4>
                <ul>
                  <li>
                    <i className="fas fa-angle-right"></i>Download the
                    “AACHARYA” App from Google play store or open the website –{" "}
                    <Link to={{ pathname: "/https://aacharya.net" }}>
                      Aacharya Portal
                    </Link>
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Just sign up (or)
                    create a student account.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Enter and save your
                    basic details and address/location.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Search for a subject.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Select the subject and
                    the portal will display the list of teachers nearby
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Choose a teacher from
                    the displayed list and chat or call to know the details
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Students/parents can
                    post their learning requirements in the portal so that the
                    teachers will contact back.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>
                    Students can opt for tuition at his/her home or at the
                    teacher’s home or at the Aacharya center.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>After starting
                    tuition, the student can give feedback through a feedback
                    link sent to him within 2days of commencement of tuition.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>A student can add a
                    list of “backlogs” in his/her dashboard and get a
                    notification when the teacher is available at his location.
                  </li>
                </ul>
              </div>
              <div className="col-md-12 pl-md-5 ftco-animate">
                <h4>How Aacharya Works For Teacher/Trainer?</h4>
                <ul>
                  <li>
                    <i className="fas fa-angle-right"></i>Download the
                    “AACHARYA” App from Google play store or open the website–{" "}
                    <Link to={{ pathname: "/https://aacharya.net" }}>
                      Aacharya Portal
                    </Link>
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Sign up (or) create an
                    account as a Tutor.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Complete the profile
                    in few simple steps.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>After completing the
                    profile, Aacharya will verify the qualification and
                    genuinity of the profile and make it active in the portal.
                    Notification will be sent to teacher after verification
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Add the subjects in
                    your area of expertise
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Adding the subjects
                    that were taught a number of times can give good feedback
                    and result. This in turn improves your rating on the
                    website.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>When the student or
                    parent selects a subject the portal will display a list of
                    teachers who can teach that. The parents can contact the
                    teacher directly via message or a call.
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>Modifications in
                    profile, slots, subjects, etc. can be made at any time
                    subjected to verification and approval.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Team />
      )}
    </>
  );
}

export default About;
