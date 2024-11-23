import { useState } from 'react';
import './Input.css'

const Input = ({ icon: Icon, errorMess, ...props }) => {
	//const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

	const validInput = (e) =>{

   /*      if(validInput.length < 8 || validInput.split(' ').length < 2){
 
         setErrorMessage('wysil się trochę i napisz coś więcej. :////');
 
        }else{
          setErrorMessage(''); //clean error
        } */

        if(e.target.value.includes('kurwa')){
          setErrorMessage('no i po co tak brzydko piszesz? :/');
          return
        }else{
          setValue(e.target.value);
		  setErrorMessage(''); //clean error
        }
      }
	
	return (
	<div className='inputErrorsBox'>
		<div className='inputBox'>
			<div className='iconBox'>
				{Icon? <Icon className='icon' /> : <></>}
			</div>
			<input
				{...props}
				className='input'
				//value={value}
				//onChange={(e) => validInput(e)}
			/>
					
		</div>
		{(errorMess||errorMessage) && <p className='textError'>{errorMess||errorMessage}</p>}
</div>
	
	);
};
export default Input;
