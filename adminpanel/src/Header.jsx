import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify, BsX } from 'react-icons/bs';

const Header = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <header className='header'>
      <div className='menu-icon' onClick={OpenSidebar}>
        {openSidebarToggle ? <BsX className='icon' /> : <BsJustify className='icon' />}
      </div>
      <div className='header-right'>
        <BsPersonCircle className='icon' />
      </div>
    </header>
  );
};

export default Header;
