import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Card,CardDeck,CardColumns} from 'react-bootstrap';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Loading from './Loading';

const Restaurant =() => {
	let {id} = useParams();
	const [restaurant,setRestaurant] = useState(null);
	const [loading,setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetch(`https://per-restaurant-api.herokuapp.com/api/restaurants/${id}`)
		.then(res => res.json())
		.then(data => {
			setLoading(false);
			if(data.hasOwnProperty("_id")){
				setRestaurant(data)
			}else{
				setRestaurant(null)
			}
		})
		.catch((err) => console.log(err));
	},[id])

	if(loading){
		return <Loading/>
	}

	if(!loading && restaurant == null){
		return (
			<Card>
				<Card.Body>
					<Card.Text>
						Unable to find restaurant with ID: {id}
					</Card.Text>
				</Card.Body>
			</Card>
		)
	}

	return (
		<>
			<Card>			
				<Card.Body>
					<Card.Title>{restaurant.name}</Card.Title>
					<Card.Text>
						{restaurant.address.building + " " + restaurant.address.street}
					</Card.Text>
					
				</Card.Body>
			</Card>
			<MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13}
			scrollWheelZoom={false}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={[ restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
			</MapContainer>
			<br/>
			<CardDeck>
				{restaurant.grades.map((rest) => {
					return (
					<Card>	
						<Card.Header>Grade: {rest.grade}</Card.Header>		
						<Card.Body>
							<Card.Text>
								Completed: {new Date(rest.date).toLocaleString().split(",")[0]}
							</Card.Text>
							
						</Card.Body>
					</Card>
				)
				})}
			</CardDeck>
		</>
	)
}

export default Restaurant;