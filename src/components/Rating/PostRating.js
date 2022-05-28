import React from 'react';
import { useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	TextField,
} from '@material-ui/core';
import { addRating } from '../../actions/userActions';
import HoverRating from './HoverRating';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function PostRating({ open, handleClose, data }) {
	const dispatch = useDispatch();
	const [rating, setrating] = React.useState('');
	const [msg, setmsg] = React.useState('');

	const handlePostRating = () => {
		if (!rating) {
			toast.error('Empty rating not accepted');
		} else if (!msg) {
			toast.error('Empty field not accepted');
		} else if (!data._id) {
			toast.error('Tutor Id missing');
		} else {
			if (data.userId) {
				dispatch(addRating(Number(rating), data.userId._id, msg));

			}
		}
		setTimeout(() => {
			setrating('');
			setmsg('');
			handleClose();
		}, 300);
	};

	const handleCancel = () => {
		setrating();
		setmsg('');
		handleClose();
	};

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				fullWidth={true}
				maxWidth='sm'
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle id='alert-dialog-slide-title' align='center'>
					Write a Review
				</DialogTitle>
				<DialogContent>
					{/* HoverRating Component */}
					<HoverRating rating={rating} setrating={setrating} />
					<TextField
						value={msg}
						onChange={(e) => setmsg(e.target.value)}
						autoFocus
						margin='dense'
						id='name'
						label='Fill in your review'
						fullWidth={true}
						multiline
						maxRows={4}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} color='secondary'>
						Cancel
					</Button>
					<Button onClick={handlePostRating} color='primary'>
						Post
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
