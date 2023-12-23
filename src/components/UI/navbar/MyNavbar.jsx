import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';

const MyNavbar = () => {
	const { isAuth, setIsAuth } = useContext();

	const logout = () => {
		setIsAuth(false);
		localStorage.removeItem('auth');
	};

	return (
		<div className='navbar'>
			<MyButton onClick={logout}>Выйти</MyButton>
			<div className='navbar-links'>
				<Link to='/'>About</Link>
				<Link to='/about'>About</Link>
			</div>
		</div>
	);
};

export default MyNavbar;
