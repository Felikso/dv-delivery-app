import React from 'react'
import sad_cat from './sad_cat.svg'
import './NetworkErrorText.css'

const NetworkErrorText = ({text, paragraph}) => {
  return (
    <div className='networkError'>
        <h2>{ text ? text : 'Niestety wystąpiły problemy z siecią'}</h2>
        <img src={sad_cat} alt='network error'/>
        <span>{ paragraph ? paragraph : 'Spróbuj ponownie odświeżyć stronę'}</span>
    </div>

  )
}

export default NetworkErrorText