import React from 'react';
import {
	Button,
	Dialog,
	Typography,
	Slide,
	Container,
	CssBaseline,
	TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addingOrganisation } from '../../actions/userActions';

import useStyles from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function AddOrganisation({ open, handleClose }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [name, setname] = React.useState('');
	const [locality, setlocality] = React.useState('');
	const [city, setcity] = React.useState('');
	const [district, setdistrict] = React.useState('');
	const [mandal, setmandal] = React.useState('');
	const [state, setstate] = React.useState('');

	const handleAddInstitute = () => {
		if (!name || !city || !district || !state) {
			toast.error('Please complete the fields');
		} else {
			dispatch(
				addingOrganisation(name, locality, city, district, mandal, state)
			);
			setTimeout(() => {
				resetStates();
				handleClose();
			}, 300);
		}
	};

	const resetStates = () => {
		setname('');
		setlocality('');
		setcity('');
		setdistrict('');
		setmandal('');
		setstate('');
	};
	const [maxWidth, setMaxWidth] = React.useState('sm');
	return (
		<div>
			<Dialog
				maxWidth={maxWidth}
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<Container component='main' maxWidth='sm'>
					<CssBaseline />
					<div className={classes.organisationPaper}>
						<Typography variant='h5' className='mt-2' gutterBottom align='left'>
							Add New Institute
						</Typography>
						<div className={`${classes.form} mb-5`}>
							<TextField
								value={name}
								onChange={(e) => setname(e.target.value)}
								variant='outlined'
								required
								margin='normal'
								fullWidth={true}
								label='Instiute Name'
								autoFocus
							/>
							<TextField
								value={locality}
								onChange={(e) => setlocality(e.target.value)}
								id='outlined-basic'
								margin='normal'
								variant='outlined'
								required
								fullWidth={true}
								label='Locality'
								autoFocus
							/>{' '}
							<TextField
								value={city}
								onChange={(e) => setcity(e.target.value)}
								margin='normal'
								variant='outlined'
								required
								fullWidth={true}
								label='City'
							/>
							<TextField
								value={district}
								onChange={(e) => setdistrict(e.target.value)}
								margin='normal'
								variant='outlined'
								required
								fullWidth={true}
								label='District'
							/>
							<TextField
								value={mandal}
								onChange={(e) => setmandal(e.target.value)}
								margin='normal'
								variant='outlined'
								required
								fullWidth={true}
								label='Mandal'
							/>
							<TextField
								value={state}
								onChange={(e) => setstate(e.target.value)}
								margin='normal'
								variant='outlined'
								required
								fullWidth={true}
								label='State'
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
								onClick={() => handleAddInstitute()}
							>
								Add Institute
							</Button>
						</div>
					</div>
				</Container>
			</Dialog>
		</div>
	);
}
