
import axios from 'axios';
import React , {useState} from 'react'
import { toast } from 'react-hot-toast'

import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading, setLoading] = useState(false) ;
    const {authUser, setAuthUser} = useAuthContext() ;
    const login = async (username,password) => {
        setLoading(true) ;
        if((username || password) === "") {
            toast.error("please fill in all the fields") ;
            return false ; 
    }

    try {
        const res = await axios.post('/api/auth/login',{
        username,
        password

    });
    if(res.error) {
        throw new Error() ; 
    }
    console.log(res) ; 
    console.log(res.data) ; 
    localStorage.setItem('chat-user',JSON.stringify(res.data)) ; 
    setAuthUser(res.data) ;
    
    }catch(err) {
        toast.error(err.message) ; 
        return false ;
    }finally {
        setLoading(false) ; 
    }
    

     
    }
    return { login, loading } ;
}

export default useLogin
