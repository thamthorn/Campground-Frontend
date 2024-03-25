'use client'
import { useState } from "react"
import VideoPlayer from "./VideoPlayer"
import { Rating } from '@mui/material';
// import useWindowListener from "@/hooks/useWindowListener";



function PromoteCard() {

    const [playing, setPlaying] = useState(true);
    const [rating, setRating] = useState(0);

    // useWindowListener('contextmenu', (e) => {e.preventDefault()})

  return (
    <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded-lg bg-gray-200
    flex flex-row">
    <VideoPlayer vdoSrc={'/vdo/getvaccine.mp4'} isPlaying={playing}></VideoPlayer>
    <div className="m-5">
        Get your vaccine today
        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3
        py-2 text-white showdow-sm"
        onClick={() => setPlaying(!playing)}>{ playing? 'Pause' : 'Play' }</button>
        <Rating className="w-auto h-[10%] " value={(rating==undefined ? 0: rating)}
        onChange={(e, newValue) => {if(newValue!= null) setRating(newValue)}}/>
    </div>
     
    </div>
  )
}

export default PromoteCard
