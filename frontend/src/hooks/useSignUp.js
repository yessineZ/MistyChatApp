import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
 import { useAuthContext } from '../context/AuthContext'; 
const useSignUp = () => {
  const [loading,setLoading] = useState(false) ; 
  const {authUser,setAuthUser}  = useAuthContext() ; 
  const signup = async ({fullName,username,email,password,confirmPassword,gender}) => {
    const sucess = handleInputErrors({fullName,username,email,password,confirmPassword,gender}) ;
    let profilePic = "" ; 
    try {
       const response = await axios.get('/api/users/avatar') ;
       profilePic = response.data.avatar ; 
      setTimeout(() => {
        console.log(profilePic) ;
      },3000)
      
    }catch(err) {
      toast.error("something went wrong with the avatar") ; 
    }
    if (!sucess) {
      return ;
    }
    setLoading(true) ; 
    try {
      const response = await axios.post('/api/auth/signup', {
        fullName,username,email,password,confirmPassword,gender,profilePic}
      )

      /* const res = fetch('/api/auth/signup',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password, fullName, email, gender}),
      }) */

      if (response.status !== 201 ) {
        toast.error("something went wrong") ; 
      }else {
        toast.success("Account created successfully") ; 
      }

      localStorage.setItem('chat-user',JSON.stringify(response)) ; 
      setAuthUser(response) ;

      const data = response.data ;
      console.log(data) ; 
      if(data.error) {
        throw new Error(data.error) ; 
      }
    
    } catch (error) {
      toast.error(error.message) ;
    } finally {
      setLoading(false)
    }
  }
  return { signup, loading } ;
}

const handleInputErrors = ({fullName,username,email,password,confirmPassword,gender}) => {
    if(!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all the fields xd') ; 
        return false ; 

}
    if(password.length < 6) {
        toast.error('Password must be at least 6 characters long') ; 
        return false ; 
    }
    if(password!== confirmPassword) {
        toast.error('Passwords do not match') ; 
        return false ; 
    }
    if(!email.includes('@')) {
        toast.error('Please enter a valid email') ; 
        return false ; 
    }

    return true ; 

}
export default useSignUp
