import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import {Card,Button} from 'react-bootstrap';

const About = () => {

	return (
		<>
			<Card>
				<Card.Header>Little About Me</Card.Header>
				<Card.Body>
					<Card.Text>
					Hi, I am Simit a very energetic and enthusiastic programmer with wide range of projects on my portoflio.
					<br/>
					<Link to="https://simityadav.vercel.app" target="_blank">Portfolio</Link> 
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}

export default About;