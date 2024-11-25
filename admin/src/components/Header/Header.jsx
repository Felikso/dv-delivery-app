import React, { useState, useEffect } from 'react';
import './Header.css';
import { headerData, objMenu } from '@/utils/variables';
import Button from '../Button/Button';

const Header = ({ time }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setTimeout(() => setMounted(true), time);
	});
	return (
		mounted && (
			<div className='header'>
				<div className='headerContents'>
					<div className='headerContentsBox title'>
						<h2>{headerData.headerH2}</h2>
						<p>{headerData.headerP}</p>

						<a href={`/#${objMenu['menu']}`}>
							<Button text={headerData.headetBtn} color='0' />
						</a>
					</div>
				</div>
			</div>
		)
	);
};

export default Header;
