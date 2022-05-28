import React, { useEffect } from 'react';
// import { Table } from 'react-bootstrap';
import axios from '../../../axios/index';
import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { toast } from 'react-toastify';
import {
	Button,
	Card,
	Container,
	Grid,
	Table,
	Typography,
} from '@material-ui/core';

import useStyles from './styles';
import { tableOptions } from '../../../utils/data/subsriptionTable';
import { useDispatch, useSelector } from 'react-redux';
import {
	getSubscriptionTable,
	getProducts,
	purchaseSubscription,
	cleanSubscription,
} from '../../../actions/tutorActions';
import { Cancel, CheckCircle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import logo from '../../../images/logo.png';
import ProgressBar from '../../../components/ProgressBar';

function ProviderSubscriptions() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const {
		subscriptionTableList,
		purchaseProducts,
		purchaseSubs,
		purchaseComplete,
		loading,
	} = useSelector((state) => state.tutorsData);
	const { user } = useSelector((state) => state.usersData);
	//console.log('purchaseProducts', purchaseProducts);

	useEffect(() => {
		dispatch(getSubscriptionTable());
		dispatch(getProducts());
	}, []);

	useEffect(() => {
		if (purchaseComplete === 1) {
			history.push('/tutor');
		}
		return () => {
			//console.log('running cleanup');
			dispatch(cleanSubscription);
		};
	}, [purchaseComplete]);

	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}
	async function displayRazorpay(subs, description, onSuccessHandler, user) {
		//console.log(user.phoneNumber);
		const res = await loadScript(
			'https://checkout.razorpay.com/v1/checkout.js'
		);

		if (!res) {
			toast.error('Unable to start payment process. Are you online?');
			return;
		}

		const result = await axios.post('/api/orders/createOrder', {
			total: subs.cost,
			currency: 'INR',
		});

		if (!result) {
			toast.warn('Server error. Are you online?');
			return;
		}

		const { key, orderId, currency } = result.data.data;
		const options = {
			key: key,
			currency: currency,
			name: 'AACHARYA',
			description: description,
			image: { logo },
			order_id: orderId,
			handler: async function (response) {
				const { data } = await axios.post('/api/orders/capture', response);
				if (result.status === 200) {
					onSuccessHandler(data.invoice.orderId, subs);
					toast.success('payment done successfully');
				}
			},
			prefill: {
				name: user.name,
				email: user.email,
				contact: user.phoneNumber,
			},
			notes: {
				address: user.place.formatted_address,
			},
			theme: {
				color: '#FAA906',
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}
	const successHandler = (uniqueId, subs) => {
		//console.log('started the success handler');
		dispatch(purchaseSubscription(uniqueId, subs));
	};
	const handlePurchaseSubscription = (id, type) => {
		if (!id) {
			toast.error('no product selected');
		}
		if (user.premiumStatus) {
			toast.warn(
				'You already have an active subscription, You cannot buy one more'
			);
			return;
		}
		if (type === 'subs') {
			purchaseSubs.map((subs) => {
				if (subs._id === id) {
					displayRazorpay(subs, 'subscription purchase', successHandler, user);
				}
			});
		}
	};
	return (
		<>
			{loading ? (
				<>
					<ProgressBar />
				</>
			) : (
				<Container maxWidth='md' fixed>
					<Typography variant='h6' className='my-3'>
						{subscriptionTableList && subscriptionTableList.notes}
					</Typography>

					<TableContainer component={Paper} className={classes.tableRoot}>
						<Table className={classes.table} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell align='center' className={classes.bronze}>
										Bronze
									</TableCell>
									<TableCell align='center' className={classes.silver}>
										Silver
									</TableCell>
									<TableCell align='center' className={classes.gold}>
										Gold
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{subscriptionTableList &&
									subscriptionTableList.subscriptionTable.map((tab, i) => {
										if (tab.rowType === 'text') {
											return (
												<TableRow key={i} className={classes.optionRow}>
													<TableCell
														component='th'
														scope='row'
														align='center'
														className={classes.thRow}
													>
														{tab.rowName}
													</TableCell>
													<TableCell
														align='center'
														className={classes.bronzeRow}
													>
														{tab.bronze}
													</TableCell>
													<TableCell
														align='center'
														className={classes.silverRow}
													>
														{tab.silver}
													</TableCell>
													<TableCell align='center' className={classes.goldrow}>
														{tab.gold}
													</TableCell>
												</TableRow>
											);
										} else if (tab.rowType === 'bool') {
											return (
												<TableRow key={i} className={classes.optionRow}>
													<TableCell
														component='th'
														scope='row'
														align='center'
														className={classes.thRow}
													>
														{tab.rowName}
													</TableCell>
													<TableCell>
														{tab.bronze ? (
															<CheckCircle style={{ color: '#008000' }} />
														) : (
															<Cancel color='error' />
														)}
													</TableCell>
													<TableCell>
														{tab.silver ? (
															<CheckCircle style={{ color: '#008000' }} />
														) : (
															<Cancel color='error' />
														)}{' '}
													</TableCell>
													<TableCell>
														{tab.gold ? (
															<CheckCircle style={{ color: '#008000' }} />
														) : (
															<Cancel color='error' />
														)}
													</TableCell>
												</TableRow>
											);
										}
									})}
							</TableBody>
						</Table>
					</TableContainer>

					<Grid container spacing={6}>
						{purchaseSubs.map((subs) => {
							if (subs.productId === 'gold_subs') {
								return (
									<>
										<Grid item xs={6}>
											<Card
												className={`${classes.cardRoot} ${classes.cardGold}`}
											>
												<Typography
													className={classes.title}
													color='textSecondary'
													gutterBottom
												>
													Gold
												</Typography>
												<Typography
													variant='h5'
													component='h2'
													className='my-2'
												>
													₹{subs.cost}.00 / year
												</Typography>
												<Button
													onClick={() =>
														handlePurchaseSubscription(subs._id, 'subs')
													}
													color='primary'
													fullWidth
												>
													Tap to buy
												</Button>
											</Card>
										</Grid>
									</>
								);
							} else if (subs.productId === 'silver_subs') {
								return (
									<>
										<Grid item xs={6}>
											<Card
												className={`${classes.cardRoot} ${classes.cardSilver}`}
											>
												<Typography
													className={classes.title}
													color='textSecondary'
													gutterBottom
												>
													Silver
												</Typography>
												<Typography
													variant='h5'
													component='h2'
													className='my-2'
												>
													₹{subs.cost}.00 / year
												</Typography>
												<Button
													onClick={() =>
														handlePurchaseSubscription(subs._id, 'subs')
													}
													color='primary'
													fullWidth
													contained
												>
													Tap to buy
												</Button>
											</Card>
										</Grid>
									</>
								);
							}
						})}
					</Grid>
				</Container>
			)}
		</>
	);
}

export default ProviderSubscriptions;
