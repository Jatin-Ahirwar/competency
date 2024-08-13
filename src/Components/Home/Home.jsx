import React from 'react'
import { Link } from 'react-router-dom'
import splashimage from '../../assets/splash.png'
import litteralogo from '../../assets/litteralogo.png'

const Home = () => {
  const litteraimage = "https://dev.littera.in//Content/GlobalSetting/Dev/logo_Dashboard.png?1.1"
  return (
    <div className='h-[100vh]  w-full px-4 flex flex-col justify-between items-center '>      

      <div className="w-full max-sm:py-0 px-2 p-4">
        <Link
          className='flex px-3' to="/">
          <img 
            className='max-sm:hidden h-[5vh] object-cover max-mid:pb-0 py-1' 
            src={litteralogo} 
            alt="" 
          />
        </Link>
      </div>

      <div className='.svgbg relative py-8 bg-white shadow-lg rounded-2xl '>
        <img className='rotate-6 '  src={splashimage} alt="" />
        <div  className='content flex flex-col gap-2'>
          <img className='litteralogo '  src={litteralogo} alt="" />
          <Link to="/employe-form" className='startext px-4 py-1 my-1 rounded-lg text-base '>Start Fracking</Link>
        </div>


        <div className='hiddenbtn justify-center pt-4 hidden'>
          <Link to="/employe-form" className='bg-[#41A8ED] text-white  px-4 py-1 my-1 rounded-lg text-base '>Start Fracing</Link>
        </div>
      </div>
      
      <div className="w-full max-sm:py-0 opacity-0  p-4">
        <Link
          className='flex px-3 cursor-none' to="">
          <img 
            className='max-sm:hidden h-[5vh] object-cover max-mid:pb-0 py-1' 
            src={litteralogo} 
            alt="" 
          />
        </Link>
      </div>


    </div>
  )
}

export default Home