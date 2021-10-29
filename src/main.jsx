/*********************************************************************************
* WEB422 – Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: ________Simit Sanjay Yadav____ Student ID: ____151009198_______ Date: ____13/10/2021_________
*
*
********************************************************************************/

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'

ReactDOM.render(
	<Router>
    	<App/>
	</Router>,
  document.getElementById('root')
)
