'use client'
import { url_img_default } from '@/images/image'
import { UserFindOne } from '@/Services/user.api';
import { useQuery } from '@tanstack/react-query';
import { Avatar } from 'flowbite-react'
import React, { useEffect, useRef } from 'react'

interface Props {
    id:number;
    remoteStream:MediaStream|null;
    display_name:string;
}

export default function MediaDiv({id, remoteStream, display_name}:Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {data:user} = useQuery({
    queryKey:["user_media_div"],
    queryFn:()=>UserFindOne(id),
    enabled:!! id
  });
  const user_data = user;
  useEffect(() => {
    //console.log("remote: ", user_data)
    if (videoRef.current && remoteStream) {
      videoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="overflow-hidden relative w-[22rem] h-[200px] bg-gray-700 rounded-xl flex justify-center items-center flex-col">
        {remoteStream ? (
          <>
            <video
              className='mt-2 w-96 rounded-2xl'
              ref={videoRef}
              autoPlay
              playsInline
            />
            <div className='absolute mt-40 left-3'>{display_name}</div>
          </>
        ) : (
          <>
            <Avatar
              size={"lg"}
              img={user?.data?.data?.avatar||url_img_default}
              rounded
              bordered
              color="success"
              placeholderInitials="Fr"
            />
            <div className='mt-2'>{user?.data?.data?.displayName}</div>
          </>
          
        )}
        
    </div>
  )
}
