import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import {Header, Footer} from './components'
import './App.css'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading, setLoading]=useState(true)
  const dispatch=useDispatch()

  // when website loads let the useffect ask the service if its logged in or not
  useEffect(()=>{
    // who is the current user
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))

  },[])


 return !loading?(
  <div className='min-h-screen flex flex-wrap content-between bg-gray-200'>
    <div className='w-full block'>
      <Header/>
      <main>
        {/* outlet comes from rect router dom */}
        {/* <Outlet></Outlet> */}
      </main>
      <Footer/>
    </div>
  </div>
 ):null
}

export default App
