import React, { useState, useEffect } from 'react';
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Paper,
} from '@material-ui/core';
import { AddCircle, Search } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import AddOrganisation from './AddOrganisation';
import { searchingOrganisation } from '../../actions/userActions';

import useStyles from './styles';

function SearchOrganisation({ setinstitute }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { searchOrganisation } = useSelector((state) => state.usersData);
	const { user, providerProfile, learnerProfile } = useSelector(
		(state) => state.usersData
	);

	const [filteredData, setFilteredData] = useState([]);
	const [searchTerm, setsearchTerm] = useState('');
	const [selectedSearch, setselectedSearch] = useState('');
	const [open, setopen] = useState(false);

	useEffect(() => {
		dispatch(searchingOrganisation(searchTerm));
	}, [searchTerm]);

	useEffect(() => {
		if (learnerProfile && learnerProfile.institute) {
			setsearchTerm(learnerProfile.institute.name);
		}
	}, [learnerProfile]);

	const handleFilter = (event) => {
		const searchTerm = event.target.value;
		setsearchTerm(searchTerm);
		const newFilter = searchOrganisation.filter((value) => {
			return value.name.toLowerCase().includes(searchTerm.toLowerCase());
		});
		if (searchTerm === '') {
			setFilteredData([]);
		} else {
			setFilteredData(newFilter);
		}
	};

	const handleClickSearch = (value) => {
		setselectedSearch(value._id);
		setsearchTerm(value.name);
		setinstitute(value._id);
		if (value) {
			setFilteredData([]);
		}
	};

	const handleOpenInstitute = () => {
		setopen(true);
	};
	const handleClose = () => {
		setopen(false);
	};

	return (
		<>
			<AddOrganisation open={open} handleClose={handleClose} />
			<div className={classes.searchRoot}>
				<FormControl fullWidth className={classes.margin} variant='outlined'>
					<InputLabel htmlFor='outlined-adornment-amount'>
						Search Institute
					</InputLabel>
					<OutlinedInput
						value={searchTerm}
						onChange={handleFilter}
						id='outlined-adornment-amount'
						startAdornment={
							<InputAdornment position='start'>
								<Search />
							</InputAdornment>
						}
						labelWidth={110}
					/>
				</FormControl>
				<IconButton
					color='primary'
					aria-label='add circle'
					className={classes.searchButton}
					onClick={handleOpenInstitute}
				>
					<AddCircle />
				</IconButton>
			</div>

			{filteredData && filteredData.length > 0 ? (
				<Paper elevation={3} className={classes.searchCard}>
					<div className={classes.searchResult}>
						{filteredData.map((value) => (
							<div
								key={value._id}
								className={classes.searchItem}
								onClick={() => handleClickSearch(value)}
							>
								<div className={classes.searchItemList}>
									<Search />
									<div>
										<p>{value.name}</p>
										<small>
											Locality: {value.locality}, {value.city}, {value.district}
											, {value.state}
										</small>
									</div>
								</div>
							</div>
						))}
					</div>
				</Paper>
			) : (
				<>
					{!searchTerm ? null : (
						<>
							{searchTerm.length > 4 && (
								<Paper elevation={3} className={classes.searchCard}>
									<div className={classes.searchResult}>
										<div className={classes.searchItem}>
											<div className={classes.searchItemList}>
												<Search />
												<div>
													<p>Not Found, add institute</p>
												</div>
											</div>
										</div>
									</div>
								</Paper>
							)}
						</>
					)}
				</>
			)}
		</>
	);
}

export default SearchOrganisation;
