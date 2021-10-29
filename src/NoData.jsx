import React from 'react';
import {Card} from 'react-bootstrap';


const NoData = () => {
	return (<Card>
		<Card.Body>
			<Card.Text>
				No restaurant found.
			</Card.Text>
		</Card.Body>
	</Card>);
}

export default NoData;