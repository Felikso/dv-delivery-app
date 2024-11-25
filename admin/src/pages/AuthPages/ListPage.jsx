import React, { useState, useEffect, Suspense, useRef } from 'react';
import { errorMessage } from '@/utils/variables';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/authStore.js';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorBoundary/ErrorBoundary';
import './AuthPages.css';
import ItemCard from '@/components/ItemCard/ItemCard';
import Loader from '@/components/Loader/Loader';
import DefaultCard from '../../components/defaultCard/DefaultCard';

const ListPage = () => {
	const [list, setList] = useState([]);

	const { fetchAuthList, updateAuthItem } = useAuthStore();

	const fetchList = async () => {
		const response = await fetchAuthList();
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
					return <DefaultCard key={i} postData={item} edit={currentEl===item._id?true:false} setCurrentEl={setCurrentEl} updateDefaultItem={updateAuthItem} allowedImputs={['name','description','category','price','image']}/>
		}

				)}
        			</div>
				</Suspense>
			</ErrorBoundary>
	

		</>
	);
};

export default ListPage;
