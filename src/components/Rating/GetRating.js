import React from 'react';
import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
} from '@material-ui/core';

import useStyles from './styles';

export default function GetRating({ allRatings }) {
	const classes = useStyles();
	return (
		<>
			{allRatings &&
				allRatings.length > 0 &&
				allRatings.map((rating) => (
					<List className={classes.getRatingRoot}>
						<ListItem>
							<ListItemAvatar>
								<Avatar
									alt={`${rating.ratedBy && rating.ratedBy.name}`}
									src={`${rating.ratedBy && rating.ratedBy.profileImage}`}
								/>
							</ListItemAvatar>
							<ListItemText
								className={classes.ratingText}
								primary={`${rating.ratedBy && rating.ratedBy.name}`}
								secondary={`${rating.msg}`}
							/>
						</ListItem>
					</List>
				))}
		</>
	);
}
