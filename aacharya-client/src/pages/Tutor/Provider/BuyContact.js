import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import {useSelector} from 'react-redux';
import axios from '../../../axios'
import {toast} from 'react-toastify';
function BuyContact({open , handleClose,lead,addContact}) {
	const {user} = useSelector(state=>state.usersData);
	// console.log(lead);
	const buyContact =()=>{
		handleClose();
		try{
			const data = axios.post('/api/tutors/purchaseContact',{
				leadId:lead._id
			})

			
				addContact(lead._id);
			
		}
		catch(err){
			toast.error('Something went wrong');
		}
	}
	return ( 
		<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
		  
        <DialogTitle id="alert-dialog-title">
			{user?.credits>=25?"Purchase contact":"Insufficient Credits"}
			</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {user?.credits>=25?"25 credits required to contact a lead":
			"Please purchase credits to proceed"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {user?.credits>=25?<Button onClick={buyContact} color="primary">
            Buy Contact
          </Button>:
		  <Button href="/tutor-credits" color="primary">Purchase Credits</Button>
		  }
          
        </DialogActions>
      </Dialog>
	 );
}

export default BuyContact;