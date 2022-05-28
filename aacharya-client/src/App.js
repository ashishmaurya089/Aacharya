import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

// Global StyleSheet
import "./App.css";
import "./CustomStyles.css";

// Components
import Home from "./pages/Home/Home";
import Footer from "./components/Layout/Footer";
import Routes from "./routing/Routes";
import About from "./pages/About/About";
import Team from "./pages/TeamMembers/Team";

import Competition from "./pages/Competitions/Competition";
import Skill from "./pages/Skills/Skill";
import Workshop from "./pages/Workshop/Workshop";
import LevelList from "./pages/Category/SegementListDetails/LevelList";
import StreamList from "./pages/Category/SegementListDetails/StreamList";
import CategoryList from "./pages/Category/SegementListDetails/CategoryList";
import SubjectsList from "./pages/Category/SegementListDetails/SubjectsList";
import SkillInfo from "./pages/Skills/SkillInfo";
import WorkshopInfo from "./pages/Workshop/WorkshopInfo";
import CompetitionInfo from "./pages/Competitions/CompetitionInfo";
import LoginForm from "./components/Registration/LoginForm";
import SignUpForm from "./components/Registration/SignUpForm";
import OTPVerify from "./components/Registration/OTPVerify";
import TutorInfo from "./pages/Tutor/TutorInfo";
import InstituteInfo from "./pages/Institute/InstituteInfo";
import OnBording from "./components/Provider/OnBording";
import Tutors from "./pages/Tutor/Tutors";
import Institutes from "./pages/Institute/Institutes";
import PressMedia from "./pages/PressMedia/PressMedia";
import ProfileEdit from "./components/UserProfie/ProfileEdit";
import RegisteredCompetitions from "./pages/Competitions/RegisteredCompetitions";
import RegisteredSkills from "./pages/Skills/RegisteredSkills";
import RegisteredWorkshops from "./pages/Workshop/RegisteredWorkshops";
import TutorHome from "./pages/Tutor/TutorHome";
import InstituteHome from "./pages/Institute/InstituteHome";
import ProviderStream from "./pages/Category/ProviderLists/ProviderStream";
import ProviderCategory from "./pages/Category/ProviderLists/ProviderCategory";
import ProviderLevel from "./pages/Category/ProviderLists/ProviderLevel";
import ProviderSubscriptions from "./pages/Tutor/Provider/ProviderSubscriptions";
import ProviderDashboard from "./pages/Tutor/Provider/ProviderDashboard";
import ProviderSubjectsList from "./pages/Category/ProviderLists/ProviderSubjectsList";
import ProviderCredits from "./pages/Tutor/Provider/ProviderCredits";
import InstituteProfile from "./pages/Institute/InstituteProfile";
import TutorProfile from "./pages/Tutor/TutorProfile";
import ReferralCode from "./components/ReferralCode";
import FindInstitute from "./pages/Institute/FindInstitute";
import FindTutor from "./pages/Tutor/FindTutor";
import MuiNavbar from "./components/Layout/MuiNavbar";
import MuiContact from "./pages/Contact/MuiContact";
import ScrollToTop from "./utils/ScrollToTop";
import ProviderPermittedLevels from "./pages/Tutor/Provider/ProviderPermittedLevels";
import ProviderFaqs from "./components/Faqs/ProviderFaqs";
import UserFaqs from "./components/Faqs/UserFaqs";
import Forgot from "./components/Forget/Forgot"
import EnterEmail from "./components/Forget/EnterEmail";
import { Share } from "@material-ui/icons";
import ShareMy from "./components/Share/ShareMy";

let accessToken = localStorage.getItem("accessToken");
function App() {
  return (
    <Router>
      <>
        <MuiNavbar />
        <ScrollToTop />
        <div style={{ minHeight: "100vh" }}>
          <Switch>
            <Route exact path="/competitions" component={Competition} />
            <Route
              exact
              path="/competitions/:competitionId"
              component={CompetitionInfo}
            />
            <Route
              exact
              path="/subscribed-competitions"
              component={RegisteredCompetitions}
            />
            <Route exact path="/skills" component={Skill} />
            <Route exact path="/skills/:skillId" component={SkillInfo} />
            <Route
              exact
              path="/subscribed-skills"
              component={RegisteredSkills}
            />
            <Route exact path="/workshops" component={Workshop} />
            <Route
              exact
              path="/workshops/:workshopId"
              component={WorkshopInfo}
            />
            <Route
              exact
              path="/subscribed-workshops"
              component={RegisteredWorkshops}
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/press-media" component={PressMedia} />
            <Route exact path="/team" component={Team} />
            <Route exact path="/contact" component={MuiContact} />
            {/* Segment Routes */}
            <Route exact path="/levels" component={LevelList} />
            <Route exact path="/stream" component={StreamList} />
            <Route exact path="/category" component={CategoryList} />
            <Route exact path="/subjects" component={SubjectsList} />
            {/* <Route exact path='/levels/:segmentId' component={LevelList} />
						<Route exact path='/stream/:levelId' component={StreamList} />
						<Route exact path='/category/:streamId' component={CategoryList} />
						<Route
							exact
							path='/subjects/:categoryId'
							component={SubjectsList}
						/> */}
            {/* Provider Segment Routes */}
            <Route exact path="/providerlevel" component={ProviderLevel} />
            <Route exact path="/providerstream" component={ProviderStream} />
            <Route
              exact
              path="/providercategory"
              component={ProviderCategory}
            />
            <Route
              exact
              path="/providersubjects"
              component={ProviderSubjectsList}
            />
            {/* Tutor Routes */}
            <Route exact path="/tutor" component={TutorHome} />
            <Route exact path="/tutors" component={Tutors} />
            <Route exact path="/tutors/:tutorId" component={TutorInfo} />
            <Route exact path="/findTutor" component={FindTutor} />
            <Route
              exact
              path="/tutor-subjects"
              component={ProviderPermittedLevels}
            />
            <Route
              exact
              path="/tutor-dashboard"
              component={ProviderDashboard}
            />
            <Route
              exact
              path="/tutor-subscriptions"
              component={ProviderSubscriptions}
            />
            <Route exact path="/tutor-credits" component={ProviderCredits} />
            <Route exact path="/tutor-faqs" component={ProviderFaqs} />
            <Route exact path="/tutor-profile" component={TutorProfile} />
            {/* Institute Routes */}
            <Route exact path="/institute" component={InstituteHome} />
            <Route exact path="/institutes" component={Institutes} />
            <Route
              exact
              path="/institutes/:instituteId"
              component={InstituteInfo}
            />
            <Route exact path="/findInstitute" component={FindInstitute} />
            <Route
              exact
              path="/institute-courses"
              component={ProviderPermittedLevels}
            />
            <Route
              exact
              path="/institute-dashboard"
              component={ProviderDashboard}
            />
            <Route
              exact
              path="/institute-subscriptions"
              component={ProviderSubscriptions}
            />
            <Route
              exact
              path="/institute-credits"
              component={ProviderCredits}
            />
            <Route exact path="/institute-faqs" component={ProviderFaqs} />
            <Route
              exact
              path="/institute-profile"
              component={InstituteProfile}
            />
            {/* Registration */}
            <Route exact path="/enter_email" component={EnterEmail} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/otp" component={OTPVerify} />
            <Route exact path="/onboarding" component={OnBording} />

            <Route exact path="/profile-edit" component={ProfileEdit} />
            <Route exact path="/faqs" component={UserFaqs} />
            <Route exact path="/referral" component={ReferralCode} />
            <Route exact path="/share" component={ShareMy} />
            <Route exact path="/" component={Home} />
            {/* <Route component={Routes} /> */}
          </Switch>
        </div>
        <Footer />
      </>
    </Router>
  );

  // function PrivateRoute({ component, ...rest }) {
  // 	return (
  // 		<Route
  // 			{...rest}
  // 			render={(props) =>
  // 				accessToken ? (
  // 					React.createElement(component, props)
  // 				) : (
  // 					<Redirect
  // 						to={{
  // 							pathname: '/login',
  // 							state: {
  // 								from: props.location,
  // 							},
  // 						}}
  // 					/>
  // 				)
  // 			}
  // 		/>
  // 	);
  // }

  // function PublicRoute({ component, ...rest }) {
  // 	return (
  // 		<Route
  // 			{...rest}
  // 			render={(props) =>
  // 				accessToken ? (
  // 					<Redirect
  // 						to={{
  // 							pathname: '/',
  // 						}}
  // 					/>
  // 				) : (
  // 					React.createElement(component, props)
  // 				)
  // 			}
  // 		/>
  // 	);
  // }
}

export default App;
