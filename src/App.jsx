import React,{useState} from 'react';
import {Redirect,Route,Switch,useHistory} from 'react-router-dom';
import {Button,Col,Container,Form,FormControl,Nav,Navbar,Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import About from  './About';
import Restaurants from './Restaurants';
import Restaurant from './Restaurant';
import NotFound from './NotFound';

import './App.css';

function App() {
	const history = useHistory();
	const [searchString,setSearchString] = useState("");

	function handleSubmit(e){
		e.preventDefault();
		history.push(`/restaurants?borough=${searchString}`);
		// <Redirect to={`/restaurants?borough=${searchString}`}/>
		setSearchString("");
	}

	return (
		<>
			<Navbar bg="light" expand="lg">
				<LinkContainer to="/">
					<Navbar.Brand>Restaurants</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<LinkContainer to="/restaurants">
						<Nav.Link>Full List</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/about">
						<Nav.Link>About</Nav.Link>
						</LinkContainer>
					</Nav>
					<Form onSubmit={handleSubmit} inline>
						<FormControl type="text" placeholder="Borough" className="mr-sm-2" value={searchString}
						onChange={(e) => setSearchString(e.target.value)} />
						<Button type="submit" variant="outline-success">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
			
			<br />
			<Container>
				<Row>
					<Col>
						<Switch>
							<Route exact path="/">
								<Redirect to="/restaurants"/>
							</Route>
							<Route exact path="/about">
								<About/>
							</Route> 
							<Route path="/restaurants">
								<Restaurants/>
							</Route> 
							<Route exact path="/restaurant/:id">
								<Restaurant/>
							</Route> 
							<Route>
								<NotFound/>
							</Route>
						</Switch>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default App;