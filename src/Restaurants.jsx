import React,{useState,useEffect} from 'react';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import {Table,Card,Pagination} from 'react-bootstrap';
import NoData from './NoData';
import Loading from './Loading';

const Restaurants = () => {
	const perPage = 10;
	const [restaurants,setRestaurants] = useState("");
	const [page,setPage] = useState(1);
	const history = useHistory();

	const location = useLocation();
	let {borough} = queryString.parse(location.search);
	
	function previousPage(){
		if(page > 1){
			setPage(prev => prev-1);
		}
	}

	function nextPage(){
		setPage(prev => prev+1);
	}

	useEffect(() => {},[restaurants]);


	useEffect(() => {
		if(borough){
			borough = borough.replace(/^\w/, (c) => c.toUpperCase())
		}

		fetch(`https://per-restaurant-api.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}${borough != undefined ? `&borough=${borough}` : ""}`)
		.then(res => res.json())
		.then(data => {
			if(data.length == 0){
				setRestaurants("nodata");
			}else{	
				setRestaurants(data);
			}
		})
		.catch((err) => console.log(err));
	},[location,page]);


	if(restaurants == "nodata"){
			return <NoData/>
	}

	if(restaurants == ""){
		return <Loading/>
	}


	return (
		<>
			<Card>
				<Card.Header>Restaurant List</Card.Header>
				<Card.Body>
					<Card.Title>Here are the finest resturant.</Card.Title>
					<Card.Text>
						Please search at the top to find the best match for the restaurants according to you choice.
					</Card.Text>
				</Card.Body>
			</Card>
			<br/>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>S No.</th>
						<th>Name</th>
						<th>Address</th>
						<th>Borough</th>
						<th>Cuisine</th>
					</tr>
				</thead>
				<tbody>					
					{restaurants && restaurants.map((restaurant,index)=>{
						return (
							<tr key={restaurant._id} onClick={()=>{ history.push(`/restaurant/${restaurant._id}`)}}>
								<td>{index+1}</td>
								<td>{restaurant.name}</td>
								<td>{restaurant.address.building + " " + restaurant.address.street}</td>
								<td>{restaurant.borough}</td>
								<td>{restaurant.cuisine}</td>
							</tr>
						)
					})}								
				</tbody>
			</Table>
			<Pagination>
				<Pagination.Prev onClick={previousPage}/>
				<Pagination.Item>{page}</Pagination.Item>
				<Pagination.Next onClick={nextPage}/>
			</Pagination>
			<br/>
			<br/>
		</>
	)
}

export default Restaurants;