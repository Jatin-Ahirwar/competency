import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import litteralogo from '../../assets/litteralogo.png'

const Nav = () => {

  return (
    <div className="w-full max-sm:py-0  p-4">
      <Link
        className='flex px-3' to="/">
        <img 
          className='max-sm:hidden h-[5vh] object-cover max-mid:pb-0 py-1' 
          src={litteralogo} 
          alt="" 
        />
      </Link>
    </div>
  );
}

export default Nav;
