import React from 'react'
import { Link } from 'react-router-dom'
import splashimage from '../../assets/splash.png'
import litteralogo from '../../assets/litteralogo.png'

const Home = () => {
  const litteraimage = "https://dev.littera.in//Content/GlobalSetting/Dev/logo_Dashboard.png?1.1"
  return (
    <div className='h-[90.5vh]  w-full px-4 flex items-center justify-center'>
      
      <div className='.svgbg relative py-8 bg-white shadow-lg rounded-2xl '>
        <img className='rotate-6 '  src={splashimage} alt="" />
        <div  className='content flex flex-col gap-2'>
          {/* <img className='litteralogo '  src={litteraimage} alt="" /> */}
          <img className='litteralogo '  src={litteralogo} alt="" />
          <Link to="/employe-form" className='startext px-4 py-1 my-1 rounded-lg text-base '>Start Fracing</Link>
        </div>

        <div className='hiddenbtn justify-center pt-4 hidden'>
          <Link to="/employe-form" className='bg-[#41A8ED] text-white  px-4 py-1 my-1 rounded-lg text-base '>Start Fracing</Link>

        </div>
      </div>


    </div>
  )
}

export default Home