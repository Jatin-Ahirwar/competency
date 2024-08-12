import React from 'react'
import Home from './Components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Nav from './Components/Home/Nav'
import ActivityContainer from './Components/Activity & Forms/ActivityContainer'


const App = () => {
  return (
    <div className="h-[100vh] overflow-hidden w-full  bg-gradient-to-r from-[#4EA8D1] to-[#1B87B8] p-0">
      <Nav/>  
      <Routes>
        <Route path='/' element={
        <>
          <Home/>
        </>  
        } />
        <Route path='/employe-form' element={
        <>
          <ActivityContainer/>
        </>  
        } />
        
      </Routes>

    </div>
  )
}

export default App