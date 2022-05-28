import axios from 'axios';

let token = localStorage.getItem('accessToken');

const instance = axios.create({
	// baseURL: 'https://api.aacharya.net',
	baseURL: 'https://aacharya.herokuapp.com',
});

// instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
instance.interceptors.request.use((req) => {
	// if (token) {
	// 	req.headers.authorization = `Bearer ${token}`;
	// } else {
	token = localStorage.getItem('accessToken');
	//console.log('accesstoken###########',token);
	req.headers.authorization = `Bearer ${token}`;
	// }
	return req;
});

export default instance;
