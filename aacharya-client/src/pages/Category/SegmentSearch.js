import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Divider, InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import useStyles from './styles';

function SegmentSearch({
	searchTerm,
	setsearchTerm,
	data,
	route,
	handleSelected,
	placeHolder,
	type,
}) {
	const classes = useStyles();
	return (
		<div className='my-3'>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<Search />
				</div>
				<InputBase
					placeholder={placeHolder}
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					vaue={searchTerm}
					onChange={(e) => setsearchTerm(e.target.value)}
					inputProps={{ 'aria-label': 'search' }}
				/>
			</div>
			{searchTerm && data && data.length > 0 && (
				<Card className={classes.cardList}>
					<div className={classes.dataResult}>
						{data.map((value) => {
							//console.log(value);
							return (
								<Link to={route} key={value._id}>
									<div
										key={value._id}
										className={classes.dataItem}
										onClick={() => {
											if (type === 'subject') {
												handleSelected(value);
												setsearchTerm('');
											} else {
												handleSelected(value._id);
												setsearchTerm('');
											}
										}}
									>
										<div className={classes.dataItemList}>
											<Search />
											<div>
												<p>{value.name}</p>
												{value.stream && value.stream.name && (
													<>
														<small>Stream: {value.stream.name}</small> <br />
													</>
												)}

												{value.level && value.level.name && (
													<small>Level: {value.level.name}</small>
												)}
											</div>
										</div>
									</div>
									<Divider />
								</Link>
							);
						})}
					</div>
				</Card>
			)}
		</div>
	);
}

export default SegmentSearch;
