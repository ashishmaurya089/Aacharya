import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useGeoLocation() {
	const [location, setLocation] = useState({
		loaded: false,
		// coordinates: { lat: '', lng: '' },
		coordinates: [],
	});

	const onSuccess = (location) => {
		setLocation({
			loaded: true,
			// coordinates: {
			// 	lat: location.coords.latitude,
			// 	lng: location.coords.longitude,
			// },
			coordinates: [location.coords.latitude, location.coords.longitude],
		});
	};

	const onError = (error) => {
		setLocation({
			loaded: true,
			error: {
				code: error.code,
				message: error.message,
			},
		});
	};

	useEffect(() => {
		if (!('geolocation' in navigator)) {
			onError({
				code: 0,
				message: 'Geolocation not supported',
			});
			const getData = async () => {
				let { data } = await axios.get('https://ipapi.co/json/');
				//console.log(data.latitude);
				//console.log(data.longitude);
			};
			getData();
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}, []);

	return location;
}

export default useGeoLocation;
