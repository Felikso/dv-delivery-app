import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { customInfo, contactMail } from '../utils/variables';
import React from 'react';
import Button from '../components/Button/Button';

const NotAdminPage = () => {
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<div className='cardContent'>
			<div className='formBox'>
				<h2 className='title textTogradient'>Cześć {user?.name}</h2>
				{user?.isAdmin ? (
					<>
						<p>siemanko {user.name}!</p>
						<Button
							onClick={handleLogout}
							text={'wyloguj'}
							color='0'
							width={'200px'}
						/>
					</>
				) : (
					<>
						<p className='textTogradient'>{customInfo.needPermissions}</p>
						<br />
						<a href={`mailto:${contactMail}`}>
							<span className='textTogradient'>kliknij</span>, żeby wysłać maila
						</a>
						<Button
							onClick={handleLogout}
							text={user ? 'wyloguj' : 'przejdź do strony logowania'}
							color='0'
							width={user ? '200px' : '300px'}
						/>
					</>
				)}
			</div>
		</div>
	);
};
export default NotAdminPage;
