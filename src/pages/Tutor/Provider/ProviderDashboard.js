import { Card, Container, Divider, Grid, Typography } from "@material-ui/core";
import { Call, Email } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCallHistory,
  getGlobalLeads,
  getStatistics,
} from "../../../actions/tutorActions";
import CallHistory from "../../../components/CallHistory";
import ChatList from "../../../components/Chats/ChatList";
import SubscriptionBanner from "../../../components/SubscriptionBanner";
import GlobalLeadDetail from "./GlobalLeadDetail";

import useStyles from "./styles";
import moment from "moment";

function ProviderDashboard({ provider }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openGlobalLeadDialog, setGlobalLeadDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState();
  const { globalLeads, statistics, callHistory } = useSelector(
    (state) => state.tutorsData
  );
  const { user, loading } = useSelector((state) => state.usersData);

  const [open, setopen] = useState(false);
  const [openChatDrawer, setopenChatDrawer] = useState(false);
  // console.log(globalLeads);
  useEffect(() => {
    if (user && user.approved) {
      dispatch(getGlobalLeads());
      dispatch(getStatistics());
      dispatch(getCallHistory());
    }
  }, []);
  const toggleGlobalLeadDialog = (bol) => {
    setGlobalLeadDialog(bol);
  };
  const handleCallHistory = () => {
    setopen(true);
  };
  const handleMessageLeads = (bool) => {
    setopenChatDrawer(bool);
  };
  console.log(statistics, '======================');
  //   console.log("&&&",statistics);
  return (
    <>
      <CallHistory
        open={open}
        handleClose={() => setopen(false)}
        callHistory={callHistory}
      />
      <ChatList
        openChat={openChatDrawer}
        handleDrawerClose={() => setopenChatDrawer(false)}
      />
      <Container maxWidth="lg">
        <Grid style={{ display: 'none' }} >
          <SubscriptionBanner type="gold" />
        </Grid>
        <Grid container spacing={2} className="my-2 ">
          <Grid item xs={6}>
            <Card
              className={`${classes.cardLeadRoot} `}
              onClick={handleCallHistory}
            >
              <div className={classes.leadRoot}>
                <Call color="disabled" />
                <div className={classes.leads}>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Call Leads
                  </Typography>
                  <Typography variant="h2" className="my-2" align="center">
                    {statistics && statistics.callLeads
                      ? statistics.callLeads
                      : 0}
                  </Typography>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              className={`${classes.cardMsgRoot}`}
              onClick={handleMessageLeads}
            >
              <div className={classes.leadRoot}>
                <Email color="disabled" />
                <div className={classes.leads}>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Message Leads
                  </Typography>
                  <Typography variant="h2" className="my-2" align="center">
                    {statistics && statistics.msgLeads
                      ? statistics.msgLeads
                      : 0}
                  </Typography>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className="my-2" align="center">
              Coaching Enquiries{" "}
              {statistics && statistics.globalLeads
                ? statistics.globalLeads
                : 0}
            </Typography>
          </Grid>
          <GlobalLeadDetail
            open={openGlobalLeadDialog}
            handleClose={toggleGlobalLeadDialog.bind(null, false)}
            lead={selectedLead}
          />
          {globalLeads &&
            globalLeads.map((value) => (
              <Grid item xs={12} md={4}>
                <div
                  className="staff"
                  onClick={() => {
                    setSelectedLead(value);
                    toggleGlobalLeadDialog(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex mb-4">
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(${value.seeker.profileImage})`,
                      }}
                    ></div>
                    <div className="info ml-4">
                      <h3>{value.seeker.name}</h3>
                      <span className="position">
                        Subject: <strong>{value.forSubject.name}</strong>
                      </span>
                      <span className="position">
                        Place:{" "}
                        <strong>
                          {value.location.coordinates[0] !== 0 &&
                            value.location.coordinates[1] !== 0
                            ? `${value.place.place}${value.place.place ? "," : " "
                            }${value.place.state}`
                            : "No Preference"}
                        </strong>
                      </span>
                      <span className="position">
                        Date: <strong>{moment(value.createdAt).format("MMM Do YY")}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
        </Grid>
        <Grid style={{ display: 'none' }}>
          <SubscriptionBanner type="silver" />
        </Grid>
      </Container>
    </>
  );
}

export default ProviderDashboard;
