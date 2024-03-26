// import React from 'react'
// import styles from './product.module.css'
'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import Rating from '@mui/material/Rating'
import React from 'react';


function Card({campgroundName, imgSrc, star, onChangeStar}: {campgroundName: string, imgSrc: string, star?: number, onChangeStar?: Function}) {

  return (
    <InteractiveCard contentName={campgroundName}>
      <div className='w-[40%] h-full relative rounded-lg'>
        <Image src={imgSrc}
        alt='product picture'
        fill={true}
        objectFit='cover'
        className='object-cover rounded-lg'/>
      </div>
      <div className='w-[40%] h-[15%] p-[16px]'>
        {campgroundName}
        {/* <Rating id={campgroundName + ' Rating'} 
        className='h-[10%] p-[10px]' 
        name={campgroundName + ' Rating'} 
        data-testid={campgroundName + ' Rating'} 
        value={5}
        onChange={handleRatingChange}/> */}
      
      </div>
      
      {
        onChangeStar? <Rating
        name={campgroundName + ' Rating'}
        className='h-[15%] p-[10px]'
        id={campgroundName + ' Rating'}
        // defaultValue={star}
        value={star}
        
        onChange={(e, newValue) => {
          console.log('Changing')
          onChangeStar(campgroundName, newValue);
        }}
        onClick={(e) => {
          console.log('preventing default')
          e.stopPropagation();
          // onChangeStar(campgroundName, newValue);
        }}
        
        data-testid={campgroundName + ' Rating'}

        // onChange={(newValue) => {
        //   setValue(newValue);
        // }}
      />:''

      }
      
      
    </InteractiveCard>
    
  )
}

export default Card
