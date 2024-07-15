import { BiLogOut } from "react-icons/bi";

import React from 'react'
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
  const {loading,logout} = useLogout()  ;
  return (
    <div className='mt-auto'>
      {!loading ? (
        <BiLogOut onClick={logout} className="w-6 h-6 text-white cursor-pointer"/>
      ) :
      <div className="spinner-border text-white" role="status">
        <span className="loading loading-spinner">Loading...</span>
      </div>}
    
    </div>
  )
}

export default LogoutButton
