import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	logo: {
		height: '55px',
		background: '#fff',
		borderRadius: '5px',
	},
	quickLink:{
		color:'white',
		'&:hover':{
			color:'red'
		}
	},
	// Avatart Bar
	headerMenu: {
		marginTop: theme.spacing(7),
	},
	headerMenuList: {
		display: 'flex',
		flexDirection: 'column',
	},
	headerMenuItem: {
		'&:hover, &:focus': {
			backgroundColor: theme.palette.primary.main,
			color: 'white',
		},
	},
	headerMenuButton: {
		marginLeft: theme.spacing(2),
		padding: theme.spacing(0.5),
	},
	headerMenuButtonCollapse: {
		marginRight: theme.spacing(2),
	},
	headerIcon: {
		fontSize: 28,
		color: 'rgba(255, 255, 255, 0.35)',
	},
	headerIconCollapse: {
		color: 'white',
	},
	profileMenu: {
		minWidth: 220,
		padding: theme.spacing(2),
	},
	profileMenuUser: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2),
	},
	profileMenuItem: {
		color: theme.palette.text.hint,
	},
	profileMenuIcon: {
		marginRight: theme.spacing(2),
		color: theme.palette.text.hint,
	},
	profileMenuLink: {
		fontSize: 16,
		textDecoration: 'none',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	// Mobile Menu Drawer
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	link: {
		color: 'gray',
		textDecoration: 'none',
	},
	listIcon: {
		'& > svg': {
			fontSize: 36,
		},
		// '& > i': {
		// 	fontSize: 36,
		// },
	},
	listOption: {
		'& > span': {
			fontSize: 16,
			fontWeight: 600,
		},
	},
	dropDownMenu: {
		top: '46px',
		left: '438px',
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	toggleMenu: {
		// margin: '0 auto',
		marginLeft: 20,
	},
}));
