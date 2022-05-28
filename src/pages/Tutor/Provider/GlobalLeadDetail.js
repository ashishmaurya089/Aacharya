import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../../axios";
import ChatList from "../../../components/Chats/ChatList";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper,
  Grid,
  Avatar,
  Typography,
} from "@material-ui/core";
import { startChat } from "../../../actions/chatActions";
import { Place } from "@material-ui/icons";
import BuyContact from "./BuyContact";

function GlobalLeadDetail({ open, handleClose, lead }) {
  const [purchasedContact, setPurchasedContact] = useState([]);
  const [selectedLead, setSelectedLead] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersData);
  const [openChatDrawer, setopenChatDrawer] = useState(false);
  const [openBuyContactDialog, setBuyContactDialog] = useState(false);
  
  const getPurchasedContact = async () => {
    try {
      const { data } = await axios.post("/api/tutors/getAllPurchasedContacts");
      setPurchasedContact(data.data);
    } catch (err) {
      toast.error(err.message);
    }
  };
  const addPurchasedContact = (leadId) => {
    // console.log('add contact',leadId);
    setPurchasedContact([
      ...purchasedContact,
      {
        seeker: leadId,
      },
    ]);
  };
  const toggleBuyContactDialog = (bol) => {
    setBuyContactDialog(bol);
  };
  useEffect(() => {
    getPurchasedContact();
  }, []);
  const sendMessage = (lead) => {
    setSelectedLead(lead);
    handleClose();
    if (purchasedContact.some((ele) => ele.seeker == lead._id)) {
      dispatch(startChat(lead?.seeker?._id));
      setopenChatDrawer(true);
    } else {
      toggleBuyContactDialog(true);
    }
  };
  // console.log(purchasedContact);
  return (
    <>
      <ChatList
        openChat={openChatDrawer}
        handleDrawerClose={() => setopenChatDrawer(false)}
      />
      <BuyContact
        open={openBuyContactDialog}
        lead={selectedLead}
        handleClose={toggleBuyContactDialog.bind(null, false)}
        addContact = {addPurchasedContact}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* <Paper
		elevation="5"
              style={{
                padding: 15,
                maxWidth: 700,
                margin: "auto",
                paddingBottom: 10,
                marginBottom: 10,
              }}
            > */}
            <Grid container>
              <Grid
                item
                container
                style={{ borderBottom: "1px solid grey", paddingBottom: 10 }}
              >
                <Grid item xs={12} sm={2}>
                  <Avatar
                    src={lead?.seeker?.profileImage}
                    style={{ width: 80, height: 80 }}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Typography variant="h6">{lead?.seeker?.name}</Typography>
                  <Typography variant="subtitle2">
                    {lead?.seeker?.phoneNumber}
                  </Typography>
                  <Typography variant="subtitle2">
                    <Place style={{ fontSize: 14 }} />{" "}
                    {lead?.location?.coordinates[0] !== 0 &&
                    lead?.location?.coordinates[1] !== 0
                      ? `${lead?.place?.place}${
                          lead?.place?.place ? "," : " "
                        }${lead?.place?.state}`
                      : "No Preference"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                style={{ borderBottom: "1px solid grey", paddingBottom: 10 }}
              >
                <Grid xs={12} item>
                  <Typography variant="h6" gutterBottom>
                    <strong>Subject</strong>
                  </Typography>
                </Grid>

                <Typography variant="body2">
                  Name: {lead?.forSubject?.name}
                  {/* <br />
                    Level: {lead?.forSubject?.level?.name}
                    <br />
                    Stream: {lead?.forSubject?.stream?.name} */}
                </Typography>
              </Grid>
              <Grid item container>
                <Grid item xs={6}>
                  <strong>Learning Mode:</strong> {lead?.learningMode}
                </Grid>
                <Grid item xs={6}>
                  <strong>Start from:</strong> {lead?.startFrom}{" "}
                </Grid>
                <Grid item xs={6}>
                  <strong>Duration:</strong> {lead?.duration}
                </Grid>
                <Grid item xs={6}>
                  <strong>Gender Preference:</strong> {lead?.genderPreference}
                </Grid>
              </Grid>
            </Grid>
            {/* </Paper> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={sendMessage.bind(null, lead)} color="primary">
            message
          </Button>
          {/* <Button onClick={handleClose} color="primary" autoFocus>
          Agree
        </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GlobalLeadDetail;
