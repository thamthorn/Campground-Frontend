// import React from 'react'
// import styles from './product.module.css'
'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import Rating from '@mui/material/Rating'
import React from 'react';


function Card({hospitalName, imgSrc, star, onChangeStar}: {hospitalName: string, imgSrc: string, star?: number, onChangeStar?: Function}) {

  return (
    <InteractiveCard contentName={hospitalName}>
      <div className='w-full h-[70%] relative rounded-t-lg'>
        <Image src={imgSrc}
        alt='product picture'
        fill={true}
        objectFit='cover'
        className='object-cover rounded-t-lg'/>
      </div>
      <div className='w-full h-[15%] p-[16px]'>
        {hospitalName}
        {/* <Rating id={hospitalName + ' Rating'} 
        className='h-[10%] p-[10px]' 
        name={hospitalName + ' Rating'} 
        data-testid={hospitalName + ' Rating'} 
        value={5}
        onChange={handleRatingChange}/> */}
      
      </div>
      
      {
        onChangeStar? <Rating
        name={hospitalName + ' Rating'}
        className='h-[15%] p-[10px]'
        id={hospitalName + ' Rating'}
        // defaultValue={star}
        value={star}
        
        onChange={(e, newValue) => {
          console.log('Changing')
          onChangeStar(hospitalName, newValue);
        }}
        onClick={(e) => {
          console.log('preventing default')
          e.stopPropagation();
          // onChangeStar(hospitalName, newValue);
        }}
        
        data-testid={hospitalName + ' Rating'}

        // onChange={(newValue) => {
        //   setValue(newValue);
        // }}
      />:''

      }
      
      
    </InteractiveCard>
    
  )
}

export default Card
