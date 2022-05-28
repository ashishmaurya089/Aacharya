import React from 'react';
import {
	Avatar,
	Container,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	Divider,
} from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';
import ProgressBar from '../ProgressBar/index';

import useStyles from './styles';
import NoItemsFound from '../NoItemsFound';

function CommonFaqs({ data, loading }) {
	const classes = useStyles();
	return (
		<>
			<Container maxWidth='lg' fixed>
				<Typography
					component='h5'
					variant='h5'
					align='center'
					className={classes.faqTitle}
				>
					FAQ's
				</Typography>
				<Divider />
				{loading ? (
					<ProgressBar />
				) : (
					<List className={classes.root}>
						{data && data.length > 0 ? (
							data.map((item) => (
								<>
									<ListItem>
										<ListItemAvatar>
											<Avatar className={classes.avatarIcon}>
												<HelpOutline />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={item.question}
											secondary={item.answer}
										/>
									</ListItem>
									<Divider />
								</>
							))
						) : (
							<>
								<NoItemsFound dialogline='No Faqs Found!' />
							</>
						)}
					</List>
				)}
			</Container>
		</>
	);
}

export default CommonFaqs;
