import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Posts from './Posts';
import About from './About';
import Error from './Error';
import PostIdPage from '../pages/PostIdPage';
const AppRouter = () => {
	return (
		<Switch>
			<Route path='/posts'>
				<Posts />
			</Route>
			<Route
				exact
				path='/posts/:id'
			>
				<PostIdPage />
			</Route>
			<Route
				exact
				path='/about'
			>
				<About />
			</Route>
			<Route path='/error'>
				<Error />
			</Route>
			<Redirect to='/error' />
		</Switch>
	);
};

export default AppRouter;
