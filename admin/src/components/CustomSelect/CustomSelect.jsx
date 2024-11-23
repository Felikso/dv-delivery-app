import React from 'react';
import './CustomSelect.css';

const CustomSelect = ({ onChange, value, options }) => {
	return (
		<div class='select'>
			<select onChange={onChange} value={value}>
				{options.map((item, i) => (
					<option key={i} value={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
};

export default CustomSelect;
