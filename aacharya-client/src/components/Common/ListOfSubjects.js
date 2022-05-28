import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Dialog,
	ListItemText,
	List,
	ListItem,
	Divider,
	IconButton,
	Typography,
	Toolbar,
	AppBar,
	Slide,
	ListItemIcon,
} from '@material-ui/core';
import { Close, ClearAll } from '@material-ui/icons';

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

export default function ListOfSubjects({ open, handleClose, data, title }) {
	const classes = useStyles();
	return (
		<div>
			<Dialog
				fullWidth={true}
				maxWidth={'sm'}
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<Typography variant='h6' className={classes.title}>
							{title}
						</Typography>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<Close />
						</IconButton>
					</Toolbar>
				</AppBar>
				<List>
					{data &&
						data.length > 0 &&
						data.map((item) => (
							<>
								<ListItem button>
									<ListItemIcon>
										<ClearAll />
									</ListItemIcon>
									<ListItemText
										primary={item.name}
										secondary={
											<>
												<small>Level: {item.level.name}</small>
												<br />
												<small>Stream: {item.stream.name} </small>
											</>
										}
									/>
								</ListItem>
								<Divider />
							</>
						))}
				</List>
			</Dialog>
		</div>
	);
}
