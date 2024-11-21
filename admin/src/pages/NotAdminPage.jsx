import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from 'react-router-dom'
import { customInfo, dashBoardData, contactMail } from '../utils/variables'
import React, {useState,useEffect} from 'react'
import Button from "../components/Button/Button";

const NotAdminPage = () => {
	const { user, logout, checkAdmin } = useAuthStore();
	const { token } = useParams();
    const navigate = useNavigate();

	const handleLogout = () => {
		logout();
        navigate('/')
      
	};


	const [list,setList] = useState([]);
  
	const { fetchMailList } = useAuthStore();
	
  
	const fetchList = async () => {
	  const response = await fetchMailList(token);

	console.log('useeffet');
	
	  if(response.data.success){
		setList(response.data.data)
	
	  }else{
		//toast.error('errorMessage')
	  }
	}
	
	useEffect(()=>{
  
	
	
		fetchList();
	
	  },[list.length])

	return (
		<div className='cardContent'>
			<div className='formBox'>
				<h2 className='title textTogradient'>Cześć, {user?.name}</h2>
				{user?.isAdmin ? 
				<>
				<p>siemanko {user.name}!</p>
				<Button
					onClick={handleLogout}
					text={'wyloguj'}
					color='0'
					width={'200px'}
				/>
				</>
				 : 
				 <>
				<p className='textError'>{customInfo.needPermissions}</p>
				<a href={`mailto:${contactMail}`}><span className='textTogradient'>kliknij</span>, żeby wysłać maila</a>
                <Button
					onClick={handleLogout}
					text={user ?'wyloguj' : 'przejdź do strony logowania'}
					color='0'
					width={user ?'200px' : '300px'}
				/>
				

				</>
				}
				
			
			</div>


	

		</div>//cardContent
	);
};
export default NotAdminPage;
