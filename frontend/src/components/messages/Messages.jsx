import React, { useEffect } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../../../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
   let {loading , messages} = useGetMessages() ;

  useListenMessages() ; 

  useEffect(() => {
    const messa = () => {
      messages = useGetMessages() ;
    }
  },)

  return (
    <div className='px-4 flex-1 overflow-auto'>
       {!loading && messages && messages.map(msg => <Message key={msg._id} message={msg} />)}
       {loading && [...Array(3)].map((_,idx) =><MessageSkeleton key={idx} />)} 
      {!loading && !messages && (
        <p className='text-center text-gray-300'>Send a message to start the conversation...</p>
      )}

    </div>
  )
}

export default Messages
