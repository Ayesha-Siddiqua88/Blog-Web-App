import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import './App.css'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading, setLoading]=useState(true)
  const dispatch=useDispatch()

  return (
    <>
      <h1>hello</h1>
    </>
  )
}

export default App
