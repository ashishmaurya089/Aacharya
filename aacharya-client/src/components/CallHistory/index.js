import React from 'react';
import {
	Avatar,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Menu,
	MenuItem,
	Dialog,
	Slide,
	AppBar,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MoreVert, Close } from '@material-ui/icons';
import NoItemsFound from '../NoItemsFound';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function CallHistory({ open, handleClose, callHistory }) {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const openMenu = Boolean(anchorEl);

	const handleClick = (event) => {
		// setsubjectIds(subjectId);
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const ITEM_HEIGHT = 48;
	return (
		<div>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<Close />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							Calls
						</Typography>
					</Toolbar>
				</AppBar>
				<Container maxWidth='sm' fixed>
					<Grid container>
						{callHistory && callHistory.length > 0 ? (
							callHistory.map((value) => (
								<Grid item xs={12}>
									<Divider />
									<List>
										<ListItem>
											<ListItemAvatar>
												<Avatar
													alt={value.seeker.name}
													src={value.seeker.profileImage}
												/>
											</ListItemAvatar>
											<ListItemText
												primary={value.seeker.name}
												secondary={`${moment(value.createdAt).format(
													'L'
												)} ${moment(value.createdAt).format('LT')}`}
											/>
											<ListItemSecondaryAction>
												<IconButton
													edge='end'
													aria-label='delete'
													onClick={(e) => handleClick(e)}
												>
													<MoreVert />
												</IconButton>
												<Menu
													id='simple-menu'
													anchorEl={anchorEl}
													keepMounted
													open={openMenu}
													onClose={handleCloseMenu}
													PaperProps={{
														style: {
															maxHeight: ITEM_HEIGHT * 4.5,
															width: '20ch',
														},
													}}
												>
													<MenuItem>Contact Lead</MenuItem>
												</Menu>
											</ListItemSecondaryAction>
											<Divider />
										</ListItem>
									</List>
								</Grid>
							))
						) : (
							<NoItemsFound dialogline='No Calls Yet!' />
						)}
					</Grid>
				</Container>
			</Dialog>
		</div>
	);
}
