import React, { useEffect , useRef} from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../../../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
   let {loading , messages} = useGetMessages() ;
  let lastMessage =useRef() ; 
  useListenMessages() ; 

  useEffect(() => {
    const messa = () => {
      messages = useGetMessages() ;
    }
  },)

  setTimeout(() => {
    lastMessage.current?.scrollIntoView({ behavior: 'smooth' }) ;  // scroll to the bottom of the messages container when new messages arrive
  },50);

  return (
    <div className='px-4 flex-1 overflow-auto'>
       {!loading &&
				messages?.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessage}>
						<Message message={message} />
					</div>
				))}
       {loading && [...Array(3)].map((_,idx) =><MessageSkeleton key={idx} />)} 
      {!loading && !messages && (
        <p className='text-center text-gray-300'>Send a message to start the conversation...</p>
      )}

    </div>
  )
}

export default Messages
