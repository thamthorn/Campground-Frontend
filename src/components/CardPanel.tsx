'use client'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import styles from './cardpanel.module.css'
import { useReducer } from 'react';
import Link from 'next/link';
import getHospitals from '@/libs/getHospitals';
// import { HospitalJson } from '../../interface';



function CardPanel() {

    const [hospitalResponse, setHospitalResponse] = useState<{ data: HospitalJson } | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const hospitals = await getHospitals();
            setHospitalResponse(hospitals);
        }
        fetchData();
    }, [])

    if(!hospitalResponse){
        return (<p>Loading ...</p>)
    }

    

    // const hospitals = [
    //     { hid: '001', hospitalName: 'Chulalongkorn Hospital', imgSrc: '/img/chula.jpg', star: 5 },
    //     { hid: '002', hospitalName: 'Rajavithi Hospital', imgSrc: '/img/rajavithi.jpg', star: 5 },
    //     { hid: '003', hospitalName: 'Thammasat University Hospital', imgSrc: '/img/thammasat.jpg', star: 5 }
    // ];

    

    //took 2 variables
    //1.stateVal Map ค่าปัจจุบันองstate
    //2.action actionที่ใช้บรรจุdata ใช้ประกอบlogicในการupdate state

    const star = new Map([
        ['Chulalongkorn Hospital', 5],
        ['Rajavithi Hospital', 5],
        ['Thammasat University Hospital', 5]
    ]);


    //set star
    const starReducer = (starMap: Map<string, number>, action:{type: string, hospitalName: string, star: number})=>{
        //check type action
        switch(action.type){
            case 'add': {
                return new Map( starMap.set(action.hospitalName, action.star) )
            }
            case 'remove': {
                starMap.delete(action.hospitalName);
                return new Map(starMap);
            }
            default: return starMap
        }
    }

    //state variable
    const [starMap, dispatch] = useReducer(starReducer, star)

  return (
    <div>
    <div className={styles.cardContainer}>
        {hospitalResponse.data.map((hospital) => (
            <Link href={`/hospital/${hospital.hid}`} className='w-1/5'>
                <Card hospitalName={hospital.hospitalName}
            imgSrc={hospital.imgSrc} star={starMap.get(hospital.hospitalName) ?? 5}
            key={hospital.hid} onChangeStar={(hospitalName: string, star: number) => dispatch({type: 'add', hospitalName: hospitalName, star: star})}            />
            
            </Link>
            
        ))}
        {/* <Card hospitalName='Chulalongkorn Hospital' imgSrc='/img/chula.jpg' star={starMap.get('Chulalongkorn Hospital') ?? 5} 
        onChangeStar={(hospitalName: string, star: number) => dispatch({type: 'add', hospitalName: hospitalName, star: star})}/>
        <Card hospitalName='Rajavithi Hospital' imgSrc='/img/rajavithi.jpg' star={starMap.get('Rajavithi Hospital') ?? 5} 
        onChangeStar={(hospitalName: string, star: number) => dispatch({type: 'add', hospitalName: hospitalName, star: star})}/>
        <Card hospitalName='Thammasat University Hospital' imgSrc='/img/thammasat.jpg' star={starMap.get('Thammasat University Hospital') ?? 5} 
        onChangeStar={(hospitalName: string, star: number) => dispatch({type: 'add', hospitalName: hospitalName, star: star})}/> */}

    </div>
    {Array.from(starMap.entries()).map(([hospital, rating]) => (
                    <div className='cursor-pointer' data-testid={hospital} key={hospital} onClick={() => dispatch({type: 'remove', hospitalName: hospital, star: rating})}>
                        {hospital + ': ' + rating}
                    </div>
                ))}
    </div>
    
  )
}

export default CardPanel
