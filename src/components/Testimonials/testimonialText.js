import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	text: {
		overflow: "auto",

		[theme.breakpoints.up("md")]: {
			height: 90,
		},
		[theme.breakpoints.down("md")]: {
			height: 70,
		},
		[theme.breakpoints.down("sm")]: {
			height: 120,
		},
	},
}));
function TestimonialText({ text }) {

	const classes = useStyles();
	const [expand, setExpand] = useState(false);
	const [wordCount, setWordCount] = useState(100);
	useEffect(() => {
		function handleResize() {
			if (window.screen.width >= 260) {
				// console.log('resize');
				setWordCount(100);
			}
			else {

				setWordCount(40);
			}
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [])

	return (
		<p className={classes.text} >
			{!expand ? text.substring(0, wordCount) : text}
			<a style={{ color: "#faa906" }} onClick={() => setExpand(!expand)}>{expand ? " Show less" : "... Read more"}
			</a></p>
	)
}

export default TestimonialText;