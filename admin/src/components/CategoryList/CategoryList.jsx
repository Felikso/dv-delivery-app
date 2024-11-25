import React, { useState, useEffect, Suspense } from 'react';
import { errorMessage } from '@/utils/variables';
import { toast } from 'react-toastify';
import { useAdminStore } from '@/store/adminStore.js';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorBoundary/ErrorBoundary';
import './CategoryList.css';
import Loader from '@/components/Loader/Loader';
import CategoryCard from '../ItemCard/CategoryCard';

const CategoryList = () => {
	const [list, setList] = useState([]);

	const { fetchCategoryList } = useAdminStore();

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
					<CategoryCard  key={i} postData={item} edit={currentEl===item._id?true:false} setCurrentEl={setCurrentEl} />
				))}
        			</div>
				</Suspense>
			</ErrorBoundary>
	

		</>
	);
};

export default CategoryList;
