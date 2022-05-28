import React from 'react';
import TestimonialsCard from './TestimonialsCard';
import './Testimonials.css';


// Images
import { Container, makeStyles } from '@material-ui/core';
import praveen from './images/praveen.jpg';
import abhijith from './images/abhijith.jpg';
import vignesh from './images/vignesh.jpg';
import nishita from './images/nishita.jpg';
import sudheer from './images/sudheer.jpg';
import sudeep from './images/sudeep.jpg';

const useStyle = makeStyles({
	headingStyle:{
		paddingBottom: "10px",
		textTransform:"uppercase",
		position:"relative",
		fontSize:30,
		fontWeight:'bold !important',
		"&:after" :{
			content: '""',
			background: "#FAA906",
			position: "absolute",
			bottom: 0,
			left: "calc(50% - 25px)",
			height: "4px",
			width: "50px",
		}
	}
})
const data = [
	{
		id: 1,
		img: `${praveen}`,
		name: 'Praveen Kumar M',
		branch:
			'Aeronautical Engineering, Shree Devi Institute of Technology, Mangalore',
		text: "I'm glad to be a part of AACHARYA for learning industry ready skills from  the best industry experts. Excellent trainers and every trainer had absolute command over the softwares. I must say that I met some of the best industry experts during my training and indeed had best learning experience from them. Training was through live online classes and I was not really a online learning student but the trainees stood up to the challenge and made the training extremely knowledgeable to achieve my goal. It was really fun loving and I enjoyed learning from Aachary. I have undergone industry training on AutoCAD, CREO, CATIA V5, HyperMesh and Ansys.",
	},
	{
		id: 2,
		img: `${abhijith}`,
		name: 'Abhijith K Menon',
		branch: 'Student, Vellore institute of Technology, Chennai, Tamilnadu',
		text: "Aacharya's skills from home concept was a knowledgeable, interactive session for 6 months starting from AutoCAD to Ansys. Within this 6 months duration, I was able to interact with many industry experts and gain their perspective views on CAD/CAE. The most attractive part is that it's only a 1 hour live-online class with affordable fees. And at the end, I was able to test myself with an assignment. Wish to do more courses with Aacharya in the future.",
	},
	{
		id: 3,
		img: `${vignesh}`,
		name: 'R Vigneshkumar',
		branch:
			'BE (Mechanical Engineering), Traceability Engineer, Vestas wind technology india pvt.ltd, Vellore',
		text: 'Aacharya is an excellent endeavour in online learning platform.Vision of the team is unique and advance..Good technical and professional staffs inspired us with their good works..enlightened to being a learner in Aacharya.',
	},
	{
		id: 4,
		img: `${nishita}`,
		name: 'Nishita Sanghvi',
		branch: 'Student (BTech), MIT ADT University',
		text: 'I have learned MATLAB and LaTeX from Aacharya. The course built a strong foundation of the basics and gradually advanced towards higher-end topics. The tutor was extremely knowledgeable and helpful and the designed course content was well organized and detailed. It was properly made to meet the standards of industrial and research applications. The course material and worksheets provided were helpful for bettering the learnt concepts. The course was highly learning-oriented and helped me strengthen my grasp on MATLAB and LaTeX.',
	},
	{
		id: 5,
		img: `${sudheer}`,
		name: 'Sudheer Ch',
		branch: 'B.Tech (Mech), Design Engineer, Excel Ardor, Hyderabad',
		text: 'Aacharya is  the most reliable and result oriented online training institution for the aspiring mechanical engineers. Iam impressed with the quality of the course content and course delivery. Well experienced faculty explained and clarified every doubt I have asked. Overall a good experience and iam glad that I have chosen this platform for learning design courses rather than any other',
	},
	{
		id: 6,
		img: `${sudeep}`,
		name: 'Sudeep Chakraborty',
		branch:
			'B.Tech (Mech), Final Year, Marri Laxman Reddy institute of technology and management, Hyderabad',
		text: "This was my first time taking an online course and with Aacharya skills. The instructor's were very helpful in addressing our doubts and have done a wonderful job taking us through the course right from the basic exercises to the advanced ones. I would like to thank them for it. I would definitely recommend other's to take this course. If I ever needed any additional training Aacharya would be my first choice! It was overall a positive experience for me.",
	},
];

function Testimonials({ color }) {
	const classes = useStyle();
	return (
		<div style={{ background: `${color}` }}>
			<Container maxWidth="lg">
				<section className='ftco-section testimony-section'>
					<div className='container'>
						<div className='row justify-content-center mb-5'>
							<div className='col-md-7 heading-section ftco-animate text-center'>
								<h2 className={classes.headingStyle}>What Our Students Say</h2>
							</div>
						</div>
						<TestimonialsCard data={data} />
					</div>
				</section>
			</Container>
		</div>
	);
}

export default Testimonials;
