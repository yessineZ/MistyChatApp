import React from 'react'
import Sidebar from '../../components/Sidebar'

import MessageContainer from '../../components/messages/MessageContainer'

function Home() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar></Sidebar>
      <MessageContainer></MessageContainer>
    </div>
      
      

  
  )
}

export default Home