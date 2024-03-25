'use client'
import useWindowListener from '@/hooks/useWindowListener';
import { useRef } from 'react'
import { useEffect } from 'react';


function VideoPlayer(
    {vdoSrc, isPlaying} : {vdoSrc: string, isPlaying: boolean}
) {

    const vdoRef = useRef<HTMLVideoElement>(null);

    useWindowListener('contextmenu', (e) => {e.preventDefault()})

    //add isPlaying at last to indicate that useEffect gonna work when isPlaying value changing
    useEffect(()=> {
        // alert('width is ' + vdoRef.current?.videoWidth)
        if(isPlaying) {
            // alert('playing')
            vdoRef.current?.play()
        }else {
            // alert('pause')
            vdoRef.current?.pause()
        }
    }, [isPlaying]);

  return (
    <video className='w-[40%]'
    src={vdoSrc}
    ref={vdoRef}
    muted loop controls>

    </video>
  )
}

export default VideoPlayer
