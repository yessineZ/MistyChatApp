import { useState } from 'react'
import Login from './pages/login/Login'
import './App.css'
import '../src/index.css' 
import Home from './pages/home/Home'
import { Navigate, Route ,Routes } from 'react-router-dom'
import SignUp from './pages/signup/SignUp'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
function App() {
  const [count, setCount] = useState(0) ; 
  const {authUser} = useAuthContext() ; 
  console.log(authUser) ; 

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>

        <Route path='/home' element={authUser ? <Home/> : <Navigate to={"/login"}/>}    />
        <Route path='/signUp' element={authUser ? <Navigate to={'/home'}></Navigate> : <SignUp/> }    />
        <Route path='/login' element={authUser ? <Navigate to={'/home'} ></Navigate> : <Login/>}    />
        <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"}/>}    />
      </Routes>
      <Toaster></Toaster>
      
    </div>
    
  )
}

export default App
