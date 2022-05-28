export const CustomButtonGroup = ({ next, previous }) => {
	const wrapper = {
		textAlign: 'center',
		marginTop: 16,
		color: '#868e96',
	};
	const icons = {
		margin: '0 20px',
		fontSize: '2.0rem',
	};
	return (
		<div className='custom-button-group'>
			<div style={wrapper}>
				<i
					onClick={() => previous()}
					className='fas fa-arrow-left'
					style={icons}
				/>
				<i
					className='fas fa-arrow-right'
					onClick={() => next()}
					style={icons}
				/>
			</div>
		</div>
	);
};
