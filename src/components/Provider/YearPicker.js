import React from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

export default function YearPicker({ selectedDate, setselectedDate }) {
	const handleDateChange = (date) => {
		setselectedDate(date.toLocaleDateString('en-US', { year: 'numeric' }));
	};
	let stringYear = selectedDate.toString();

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<DatePicker
				variant='inline'
				views={['year']}
				label='Select Year'
				helperText='Select the Completion of Year'
				value={stringYear}
				onChange={(date) => handleDateChange(date)}
			/>
		</MuiPickersUtilsProvider>
	);
}
