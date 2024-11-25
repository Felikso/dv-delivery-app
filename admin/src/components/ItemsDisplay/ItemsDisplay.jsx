import React, { useState, useEffect } from 'react';
import './ItemsDisplay.css';
import Item from '../Item/Item';

import { allCategoriesName } from '@/utils/variables.jsx';
import { useAuthStore } from '@/store/authStore';
import { useItemStore } from '@/store/itemStore';
/* import BackgroundAnimation from '../BackgroundAnimation/BackgroundAnimation'; */
import NetworkErrorText from '../NetworkErrorText/NetworkErrorText.jsx';
import ItemSkeleton from '../Item/ItemSkeleton';
const ItemsDisplay = ({ category, time }) => {

	const [mounted, setMounted] = useState(false)

	useEffect(()=>{
		setTimeout(()=>setMounted(true), time)
	})

	const { netErr, dataLoading } = useAuthStore();

  const { fetchItemsList, items_list } = useItemStore();

	const fetchList = async () => {
		await fetchItemsList();
	};

	useEffect(() => {
		fetchList();
	}, []);

	return (
		mounted && <div className='itemsDisplay FIAnim' id='itemsDisplay'>
			{netErr && <NetworkErrorText />}
			<div className='itemsDisplayList'>

			
				{dataLoading ? (
				<ItemSkeleton items={8} />
				) : (
					items_list?.length > 0 &&
					items_list.map((item, i) => {
						if (category === allCategoriesName || category === item.category) {
							return <Item key={i} item={item} time={500*i}/>;
						}
					})
				)}
			</div>
		</div>
	);
};

export default ItemsDisplay;
