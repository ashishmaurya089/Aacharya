import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Themes from './themes';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { ToastContainer } from 'react-toastify';

// Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.min.css';
// Carousel
import 'react-multi-carousel/lib/styles.css';
// React-Toastify css
import 'react-toastify/dist/ReactToastify.css';
// Redux
import { store, persistor } from './store';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={Themes.default}>
			<Provider store={store}>
				<CssBaseline />
				<ToastContainer />
				<PersistGate persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
