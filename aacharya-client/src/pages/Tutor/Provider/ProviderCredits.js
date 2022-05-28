import React, { useEffect } from 'react';
import { Button, Card, Container, Grid, Typography } from '@material-ui/core';
import SubscriptionBanner from '../../../components/SubscriptionBanner';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProducts,
	purchaseProduct,
	cleanSubscription,
} from '../../../actions/tutorActions';
import useStyles from './styles';
import axios from '../../../axios/index';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import logo from '../../../images/logo.png';
function ProviderCredits() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
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
	async function displayRazorpay(pro, description, onSuccessHandler, user) {
		const res = await loadScript(
			'https://checkout.razorpay.com/v1/checkout.js'
		);

		if (!res) {
			toast.error('Unable to start payment process. Are you online?');
			return;
		}

		const result = await axios.post('/api/orders/createOrder', {
			total: pro.cost,
			currency: 'INR',
		});
		if (!result) {
			toast.warn('Server error. Are you online?');
			return;
		}

		const { key, orderId } = result.data.data;
		const options = {
			key: key,
			currency: 'INR',
			name: 'AACHARYA',
			description: description,
			image: { logo },
			order_id: orderId,
			handler: async function (response) {
				try {
					const { data } = await axios.post('/api/orders/capture', response);
					//console.log(data);
					if (result.status === 200) {
						onSuccessHandler(data.invoice.orderId, pro);
						toast.success('payment done successfully');
					} else {
						//console.log(data);
						toast.warn('payment was not successfully');
					}
				} catch (error) {
					//console.log(error);
					if (error.response.data.msg) {
						toast.error(error.response.data.msg);
					} else {
						toast.error(`Failed with error : ${error}`);
					}
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
	const { user } = useSelector((state) => state.usersData);
	const {
		subscriptionTableList,
		purchaseProducts,
		purchaseSubs,
		purchaseComplete,
	} = useSelector((state) => state.tutorsData);
	useEffect(() => {
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
	const successHandler = (uniqueId, subs) => {
		//console.log('started the success handler');
		dispatch(purchaseProduct(uniqueId, subs));
	};
	const handlePurchaseProduct = (id, type) => {
		if (!id) {
			toast.error('no product selected');
		}
		if (type === 'product') {
			purchaseProducts.map((pro) => {
				if (pro._id === id) {
					displayRazorpay(pro, 'purchase credits', successHandler, user);
				}
			});
		}
	};
	return (
		<Container maxWidth='md' fixed>
			<SubscriptionBanner type='gold' showButton={true} />
			<Grid container spacing={2}>
				{purchaseProducts &&
					purchaseProducts
						.slice(0)
						.reverse()
						.map((pro) => (
							<Grid item xs={4}>
								<Card className={`${classes.cardRoot} ${classes.cardSilver}`}>
									<Typography
										className={classes.title}
										color='textSecondary'
										gutterBottom
									>
										{pro.creditValue} credits
									</Typography>
									<Typography variant='h5' component='h2' className='my-2'>
										₹{pro.creditValue}.00
									</Typography>
									<Button
										onClick={() => handlePurchaseProduct(pro._id, 'product')}
										color='primary'
										fullWidth
										contained
									>
										Tap to buy
									</Button>
								</Card>
							</Grid>
						))}
			</Grid>
		</Container>
	);
}

export default ProviderCredits;
