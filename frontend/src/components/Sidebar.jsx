import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
function Sidebar() {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput></SearchInput>
      <div className='divider px-3'></div>
      <Conversations></Conversations>
      <LogoutButton></LogoutButton>
    {/*<Conversation></Conversation>*/ }
    {/*<LogOut*/ }
    

    </div>
  )
}

export default Sidebar
