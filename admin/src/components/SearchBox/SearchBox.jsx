import { useEffect, useState } from 'react';
import './SearchBox.css';
import { useAdminStore } from '@/store/adminStore';
import loop_icon from './loop_icon.svg';
import procent_icon from './procent_icon.svg';
import toast from 'react-hot-toast';

function SearchBox() {
	const { setRabat, fetchMailList } = useAdminStore();
	const [list, setList] = useState([]);


	const fetchList = async () => {
		const response = await fetchMailList();
		console.log(response);
		
		if (response.data.success) {
			setList(response.data.data.sort());
		} else {
			toast.error('Problem z pobraniem danych');
			toast.success('Spróbuj odświeżyć stronę');
		}
	};

	useEffect(() => {
		fetchList();
	}, [list.length]);
	//fetch datas

	const [value, setValue] = useState('');

	const handleChange = (e) => {
		if (e.target.value == '10' || e.target.value == '100') {
			setValue(e.target.value);
		} else {
			if (e.target.value == '0') {
				e.preventDefault();
				return;
			}

			if (e.target.value.split('').length > 2) {
				e.preventDefault();
				return;
			}
		}
		setValue(e.target.value.replace(/[^0-9]/g, ''));
	};

	//data changing in input

	const [query, setQuery] = useState('');

	const [selectAll, setSelectAll] = useState(false);

	const [checkedData, setCheckedData] = useState([]);

	const [rabatExpirest, setRabatExpirest] = useState('');



	const handleChangeSelect = (e) => {
		setRabatExpirest(e.target.value);
	}

	const convertDate = (dateStr) => {
		const date = new Date(dateStr);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
		const year = date.getFullYear();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
		return formattedDate;
	};

	const hours24 = 24 * 60 * 60 * 1000;
	let countRabatDays = Date.now() + rabatExpirest * hours24; // 7 * 24 hours;

	let renderRabatDays = convertDate(new Date(countRabatDays));
	

	const handleChangeCheck = (e) => {
		if(e.target.id=='all'){
			setCheckedData(list);
			let checkboxesArr = document.querySelectorAll("input[type='checkbox']");
			checkboxesArr.forEach((i) => (i.checked = true));
		}else{
			document.querySelector('#all').checked = false
		}
		if (e.target.checked == true) {
			setCheckedData((checkedData) => [...checkedData, e.target.id]);
		}
		if (e.target.checked == false) {
			let newArr = checkedData;
			let index = newArr.indexOf(e.target.id);
			if (index !== -1) {
				newArr.splice(index, 1);
				setCheckedData(newArr);
			}
		}
	};

	const [rabatCode, setRabatCode] = useState('');

	//send selected data

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		if(value ==''){
			//await new Promise((reslove)=>setTimeout(reslove, 500))
			toast.error('wpisz wartość przyznawanego rabatu')
			return
		}
		if(checkedData.length<1){

			toast.error('musisz wybrać uzytkownika')
			return
		}
		if(!rabatExpirest){
			toast.error('zatwierdź czas trwania rabatu')
			return
		}

		let rabatValue = (value / 100).toString().replace('0.', '.');
		let emailArr = list.length < checkedData.length ? ['all'] : checkedData.filter(item => item !== 'all');
		let rabatCodeExpiresAt = rabatExpirest;
		try {
			const response = await setRabat(rabatValue, emailArr, rabatCodeExpiresAt);

			if (response.data.success) {
				toast.success(`Rabat ${value}% ustawiony pomyślnie`, {
					duration: 5000,
					position: 'bottom-center',
				});
				setCheckedData([]);
				setValue('');
				setRabatCode(response.data.rabatCode);
				//uncheck all checkboxes if success
				let checkboxesArr = document.querySelectorAll("input[type='checkbox']");
				checkboxesArr.forEach((i) => (i.checked = false));
			} else {
				toast.error(errorMessage);
			}
		} catch (error) {
			toast.error('Problem z ustawieniem rabatu');
		}
	};

	//coppy to clipboard npm i react-copy-to-clipboard

	async function copyTextToClipboard(text) {
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(text);
		} else {
			document.execCommand('copy', true, text);
		}
	}

	const textToCopy = rabatCode;

	const handleCopyClick = (e) => {
		e.preventDefault(); //cause form
		copyTextToClipboard(textToCopy);
		toast.success('rabatskopiowanydo schowka');
	};

	if (!list.includes('all')) {
		list.unshift('all');
	}
	return (
		<form className='SearchBox' /* onClick={handleSubmit} */>
			<p>Wybierz adresy e-mail, którym chcesz przyznać rabat</p>
			{rabatCode && (
				<div className='buttonBox'>
					<div className='rabatCode search'>{textToCopy}</div>
					<button onClick={(e) => handleCopyClick(e)}>
						Skopiuj kod rabatowy
					</button>
				</div>
			)}
			<div className='inputBox'>
				<div className='iconBox'>
					<img src={loop_icon} alt='Wyszukaj adres email' className='icon' />
				</div>
				<input
					className='search'
					placeholder='Wyszukaj...'
					onChange={(e) => setQuery(e.target.value.toLowerCase())}
				/>
			</div>
		
			{rabatExpirest&& <p>rabat wygaśnie: {renderRabatDays}</p>}
			<div className='buttonBox'>
				<select className='search' onChange={handleChangeSelect} required>
				<option>wybierz czas trwania rabatu</option>
					<option value='1'>dzień</option>
					<option value='7'>tydzień</option>
					<option value='30'>miesiąc</option>
				</select>
				<button className='disabled'>czas trwania rabatu</button>
			</div>

			<div className='buttonBox'>
				<div className='inputBox'>
					<div className='iconBox'>
						<img src={procent_icon} alt='wpisz % rabatu' className='icon' />
					</div>
					<input
						className='search'
						placeholder='Wpisz wysokość rabatu'
						value={value}
						onChange={handleChange}
						required
					/>
				</div>
				<button onClick={handleSubmit} type='submit'>
					zatwierdź
				</button>
			</div>

			<div className='list'>
				{list
					.filter((asd) => asd.includes(query))
					.map((item, i) => (
						<div className='listItem' key={i}>
							<div className='checkbox-wrapper'>
								<input type='checkbox' id={item} onChange={handleChangeCheck} />
								<label htmlFor={item}>
									<div className='tick_mark'></div>
								</label>
							</div>
							<p>{item == 'all' ? 'każdy uzytkownik' : item}</p>
						</div>
					))}
			</div>
		</form>
	);
}

///////////////////////SEARCH ON A DATASearchTable

// function SearchBox() {
//   const [query, setQuery] = useState("");
//   const keys = ["first_name", "last_name", "email"];
//   const search = (data) => {
//     return data.filter((item) =>
//       keys.some((key) => item[key].toLowerCase().includes(query))
//     );
//   };
// return (
//   <div className="SearchBox">
//       <input
//         className="search"
//         placeholder="Search..."
//         onChange={(e) => setQuery(e.target.value.toLowerCase())}
//       />
//     {<SearchTable data={Search(Users)} />}
//   </div>
// );
// }

////////////////////// API SEARCH
/* 
function SearchBox() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000?q=${query}`);
      setData(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);

  return (
    <div className="SearchBox">
        <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      {<SearchTable data={data} />}
    </div>
  );
} */

export default SearchBox;
