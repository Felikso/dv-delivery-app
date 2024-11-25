import React, { useState, useEffect} from 'react';
import './AppDownload.css';
import { appData, brandData, socialLinks } from '@/utils/variables';
import { assets } from '@/assets/assets';

const AppDownload = ({time}) => {
	const [mounted, setMounted] = useState(false)

	useEffect(()=>{
		setTimeout(()=>setMounted(true), time)
	})
	return (
		mounted && <div className='appDownload FIAnim' id='appDownload'>
			<p>
				{appData.p} <br /> {brandData.name} App
			</p>
			<div className='appDownloadPlatforms'>
				<a href={socialLinks.ps}>
					<img
						src={assets.play_store}
						alt={`${brandData.name} w Sklepie Play`}
						height='130'
						width='130'
						loading='lazy'
					/>
				</a>
				<a href={socialLinks.as}>
					<img src={assets.app_store} alt={`${brandData.name} na AppStore`} 
													height='130'
													width='130'
													loading='lazy'/>
				</a>
			</div>
		</div>
	);
};

export default AppDownload;
