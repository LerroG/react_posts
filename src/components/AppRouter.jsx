import React, { useContext } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router';
import { AuthContext } from '../context';
import MyLoader from './UI/loader/MyLoader';

const AppRouter = () => {
	const { isAuth, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <MyLoader />;
	}

	return isAuth ? (
		<Switch>
			{privateRoutes.map((route) => {
				<Route
					component={route.component}
					path={route.path}
					exact={route.exact}
					key={route.path}
				/>;
			})}

			<Redirect to='/posts' />
		</Switch>
	) : (
		<Switch>
			{publicRoutes.map((route) => {
				<Route
					component={route.component}
					path={route.path}
					exact={route.exact}
					key={route.path}
				/>;
			})}

			<Redirect to='/login' />
		</Switch>
	);
};

export default AppRouter;
