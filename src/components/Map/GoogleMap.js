import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import AutoCompleteSearch from './AutoCompleteSearch';
import styled from 'styled-components';
import Marker from './Marker';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../../actions/commonActions';

const Wrapper = styled.main`
	width: 100%;
	height: 100vh;
	padding: 0 20px;
	margin-bottom: 30px;
`;

function GoogleMap() {
	const dispatch = useDispatch();
	// Redux State => user Coordindates for initial Render
	const { user, providerProfile, loading } = useSelector(
		(state) => state.usersData
	);

	const [zoom, setzoom] = useState(16);
	const [address, setAddress] = useState('');
	const [coordinates, setcoordinates] = useState([]);
	const [selectedCoordinates, setselectedCoordinates] = useState([]);

	useEffect(() => {
		// To Get current location of user location
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setcoordinates([latitude, longitude]);
			}
		);
	}, []);
	useEffect(() => {
		if (user && user.location && user.location.coordinates) {
			setselectedCoordinates(user.location.coordinates);
		}
	}, [user]);
	const handleClick = (obj) => {
		//console.log('handleClick ', obj.x, obj.y, obj.lat, obj.lng, obj.event);
		setselectedCoordinates([obj.lat, obj.lng]);
	};
	const handleUpdateLocation = () => {
		dispatch(updateLocation(selectedCoordinates));
		setAddress('');
	};
	//console.log('Coordinates By GeoLocation ', coordinates);
	//console.log('selectedCoordinates', selectedCoordinates);
	return (
		<>
			<AutoCompleteSearch
				selectedCoordinates={setselectedCoordinates}
				setAddress={setAddress}
				address={address}
				handleUpdateLocation={handleUpdateLocation}
				loading={loading}
			/>
			<Wrapper>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: 'AIzaSyBzi0kKv6DvqUW2vak1ewQlCB_rywWF5EY',
					}}
					defaultCenter={coordinates}
					center={selectedCoordinates}
					defaultZoom={zoom}
					onClick={handleClick}
				>
					<Marker
						text={address}
						lat={selectedCoordinates[0]}
						lng={selectedCoordinates[1]}
						onClick={handleClick}
					/>
				</GoogleMapReact>
			</Wrapper>
		</>
	);
}

export default GoogleMap;
