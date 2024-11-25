import React, { useState, useEffect, Suspense } from 'react';
import { errorMessage } from '@/utils/variables';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/authStore.js';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorBoundary/ErrorBoundary';
import './AuthPages.css';
import Loader from '@/components/Loader/Loader';
import DefaultCard from '../../components/defaultCard/DefaultCard';
import { useItemStore } from '../../store/itemStore';

const ListPage = () => {
	const [list, setList] = useState([]);

	const { updateAuthItem, removeAuthItem } = useAuthStore();

	const { fetchItemsList } = useItemStore();

	const fetchList = async () => {
		const response = await fetchItemsList();
		if (response.data.success) {
			setList(response.data.data.reverse());
		} else {
			toast.error(errorMessage);
		}
	};

	useEffect(() => {
		fetchList();
	}, []);
	const [currentEl, setCurrentEl] = useState('')

	

	return (
		<>

      <ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => navigate('/')}
			>
				<Suspense fallback={<Loader />}>
        <div className='listBox'>
        {list.map((item, i) => {
					return <DefaultCard removeDefaultItem={removeAuthItem} fetchList={fetchList} key={i} postData={item} edit={currentEl===item._id?true:false} setCurrentEl={setCurrentEl} updateDefaultItem={updateAuthItem} allowedImputs={['name','description','category','price','image']}/>
		}

				)}
        			</div>
				</Suspense>
			</ErrorBoundary>
	

		</>
	);
};

export default ListPage;
