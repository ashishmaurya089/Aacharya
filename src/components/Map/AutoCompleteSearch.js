import React from 'react';
import {
	Backdrop,
	Button,
	CircularProgress,
	FormControl,
	InputAdornment,
	OutlinedInput,
	Paper,
} from '@material-ui/core';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';
import { Search } from '@material-ui/icons';

import useStyles from './styles';

export default function AutoCompleteSearch({
	selectedCoordinates,
	setAddress,
	address,
	handleUpdateLocation,
	loading,
}) {
	const classes = useStyles();
	const handleAddressChange = (address) => {
		setAddress(address);
	};
	const handleSelect = (address) => {
		setAddress(address);
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => {
				selectedCoordinates([latLng.lat, latLng.lng]);
			})
			.catch((error) => console.error('Error', error));
	};

	return (
		<>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<PlacesAutocomplete
				value={address}
				onChange={handleAddressChange}
				onSelect={handleSelect}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div className={classes.root}>
						<div className={classes.locationInput}>
							<FormControl
								fullWidth={true}
								className={classes.margin}
								variant='outlined'
							>
								<OutlinedInput
									id='location-search-input'
									margin='normal'
									{...getInputProps({
										className: 'location-search-input',
										placeholder: 'Enter Location',
									})}
									startAdornment={
										<InputAdornment position='start'>
											<Search />
										</InputAdornment>
									}
								/>
							</FormControl>
							<Button
								variant='contained'
								color='primary'
								onClick={handleUpdateLocation}
							>
								Save Location
							</Button>
						</div>
						<Paper elevation={3} className={`autocomplete-dropdown-container `}>
							{/* {loading && <div>Loading...</div>} */}
							{suggestions.map((suggestion, index) => {
								const className = suggestion.active
									? 'suggestion-item--active'
									: 'suggestion-item';
								return (
									<div
										key={index}
										{...getSuggestionItemProps(suggestion, {
											className,
										})}
										className={
											suggestion.active
												? `${classes.locationResultTrue}`
												: `${classes.locationResultFalse}`
										}
										style={{ padding: '6px 0' }}
									>
										<span className={classes.locationDesc}>
											{suggestion.description}
										</span>
									</div>
								);
							})}
						</Paper>
					</div>
				)}
			</PlacesAutocomplete>
		</>
	);
}
