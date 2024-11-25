import React, { useState, useEffect, Suspense } from 'react';
import { errorMessage } from '@/utils/variables';
import { toast } from 'react-toastify';
import { useAdminStore } from '@/store/adminStore.js';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorBoundary/ErrorBoundary';
import './CategoryList.css';
import Loader from '@/components/Loader/Loader';
import DefaultCard from '../defaultCard/DefaultCard';

const CategoryList = () => {
	const [list, setList] = useState([]);

	const { fetchCategoryList, delateFocus, updateCategory, removeCategory } = useAdminStore();

	const fetchList = async () => {
		const response = await fetchCategoryList();
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
        {list.map((item, i) => (
					<DefaultCard removeDefaultItem={removeCategory} fetchList={fetchList} key={i} postData={item} edit={currentEl===item._id?true:false} setCurrentEl={setCurrentEl} setDefaultTrue={delateFocus} updateDefaultItem={updateCategory} allowedImputs={['name','image']} />
				))}
        			</div>
				</Suspense>
			</ErrorBoundary>
	

		</>
	);
};

export default CategoryList;
