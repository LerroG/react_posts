import React from 'react';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
	return (
		<div className='navbar'>
			<div className='navbar-links'>
				<Link to='/'>About</Link>
				<Link to='/about'>About</Link>
			</div>
		</div>
	);
};

export default MyNavbar;
