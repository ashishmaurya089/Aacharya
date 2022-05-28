import React from 'react';
import { Table } from 'react-bootstrap';
import { tableOptions } from '../../utils/data/subsriptionTable';

import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Grid,
	Typography,
} from '@material-ui/core';

import useStyles from './styles';

function InstituteSubscriptions() {
	const classes = useStyles();

	return (
		<Container maxWidth='md' fixed>
			<Typography variant='h6' className='my-3'>
				* 25 credits are required for connecting with a learner/parent either
				via a call or msg
			</Typography>
			<Table bordered className={classes.tableRoot}>
				<thead>
					<tr>
						<th></th>
						<th className={classes.bronze}>Bronze</th>
						<th className={classes.silver}>Sliver</th>
						<th className={classes.gold}>Gold</th>
					</tr>
				</thead>
				<tbody>
					{tableOptions.map((tab) => (
						<tr key={tab.id} className={classes.optionRow}>
							<td className={classes.thRow}>{tab.option}</td>
							<td>{tab.bronze}</td>
							<td>{tab.silver}</td>
							<td>{tab.gold}</td>
						</tr>
					))}
				</tbody>
			</Table>

			<Grid container spacing={6}>
				<Grid item xs={6}>
					<Card className={`${classes.cardRoot} ${classes.cardGold}`}>
						<Typography
							className={classes.title}
							color='textSecondary'
							gutterBottom
						>
							Gold
						</Typography>
						<Typography variant='h5' component='h2' className='my-2'>
							₹1,499.00 / year
						</Typography>
						<Typography variant='body2' className={classes.tap}>
							Tap to buy
						</Typography>
					</Card>
				</Grid>
				<Grid item xs={6}>
					<Card className={`${classes.cardRoot} ${classes.cardSilver}`}>
						<Typography
							className={classes.title}
							color='textSecondary'
							gutterBottom
						>
							Silver
						</Typography>
						<Typography variant='h5' component='h2' className='my-2'>
							₹399.00 / year
						</Typography>
						<Typography variant='body2' className={classes.tap}>
							Tap to buy
						</Typography>
					</Card>
				</Grid>
			</Grid>

			{/* <TableContainer component={Paper} className={classes.tableRoot}>
				<Table className={classes.table} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell align='center' className={classes.bronze}>
								Bronze
							</TableCell>
							<TableCell align='center' className={classes.silver}>
								Silver
							</TableCell>
							<TableCell align='center' className={classes.gold}>
								Gold
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableOptions.map((row) => (
							<TableRow key={row.id} className={classes.optionRow}>
								<TableCell component='th' scope='row' className={classes.thRow}>
									{row.option}
								</TableCell>
								<TableCell align='center' className={classes.bronzeRow}>
									{row.bronze}
								</TableCell>
								<TableCell align='center' className={classes.silverRow}>
									{row.silver}
								</TableCell>
								<TableCell align='center' className={classes.goldrow}>
									{row.gold}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer> */}
		</Container>
	);
}

export default InstituteSubscriptions;
