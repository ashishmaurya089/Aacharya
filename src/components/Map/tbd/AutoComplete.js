// Autocomplete.js
import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	position: relative;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 20px;
	text-align: center;
`;

class AutoComplete extends Component {
	constructor(props) {
		super(props);
		this.clearSearchBox = this.clearSearchBox.bind(this);
	}

	componentDidMount({ map, mapApi } = this.props) {
		const options = {
			// restrict your search to a specific type of result
			types: ['address'],
			// restrict your search to a specific country, or an array of countries
			// componentRestrictions: { country: ['gb', 'us'] },
		};
		//console.log(map, mapApi);
		this.autoComplete = new mapApi.places.Autocomplete(
			this.searchInput,
			options
		);
		this.autoComplete.addListener('place_changed', this.onPlaceChanged);
		this.autoComplete.bindTo('bounds', map);
	}

	componentWillUnmount({ mapApi } = this.props) {
		mapApi.event.clearInstanceListeners(this.searchInput);
	}

	onPlaceChanged = ({ map, addplace } = this.props) => {
		//console.log('Autocompletee');
		const place = this.autoComplete.getPlace();

		if (!place.geometry) return;
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);
		}
		//console.log('placesss', place);
		addplace(place);
		this.searchInput.blur();
	};

	clearSearchBox() {
		this.searchInput.value = '';
	}

	handleUpdateLocation() {}
	render() {
		return (
			<Wrapper>
				{/* <div
				style={{
					position: 'relative',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					padding: '20px',
					textAlign: 'center',
				}}
			> */}
				<div className='input-group mb-3'>
					<div className='input-group-prepend'>
						<span className='input-group-text' id='basic-addon1'>
							<i className='fas fa-search'></i>
						</span>
					</div>
					<input
						type='text'
						className='form-control'
						aria-label='Username'
						aria-describedby='basic-addon1'
						ref={(ref) => {
							this.searchInput = ref;
						}}
						onFocus={this.clearSearchBox}
						placeholder='Enter a location'
					/>
					<button
						type='button'
						className='btn btn-primary'
						onClick={this.handleUpdateLocation}
					>
						Save Location
					</button>
				</div>

				{/* 			
				<input
					style={{ width: '50%', padding: '6px 20px' }}
					className='search-input'
					ref={(ref) => {
						this.searchInput = ref;
					}}
					type='text'
					onFocus={this.clearSearchBox}
					placeholder='Enter a location'
				/> */}
				{/* </div> */}
			</Wrapper>
		);
	}
}

export default AutoComplete;
