import React, { useState, useEffect } from 'react';
import { BsGrid1X2Fill, BsPeopleFill, BsFillGearFill } from 'react-icons/bs';
import { PiPaintBrushDuotone } from 'react-icons/pi';
import { TiContacts } from 'react-icons/ti';
import { Link } from 'react-router-dom'; // Import Link
import Logo from '../src/images/imglogo.png';
import './Sidebar.css';
import { FiChevronDown } from 'react-icons/fi'; 
function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [click, setClick] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showUsers, setShowUsers] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const showList=()=>{
    setShowUsers(prevState => !prevState); 
  }

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar sidebar-responsive" : "sidebar"}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src={Logo} className='icon_header' alt="Logo" />
        </div>
        {openSidebarToggle && (
          <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        )}
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/home" onClick={handleClick}>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/Auctions" onClick={handleClick}>
            <PiPaintBrushDuotone className='icon' /> Auctions
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/artItems" onClick={handleClick}>
            <PiPaintBrushDuotone className='icon' /> Art Items
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/Categories" onClick={handleClick}>
            <TiContacts className='icon' /> Categories
          </Link>
        </li>

        <li className='sidebar-list-item'>
          <Link  onClick={()=>showList()}>
            <TiContacts className='icon' /> Users
            <FiChevronDown className={`arrow-icon ${showUsers ? 'rotate' : ''}`} />
          </Link>
        </li>
        <div className={`users ${showUsers ? 'open' : 'closed'}`}>
        <li className='sidebar-list-item' style={{padding:'5px'}}>
          <Link className='sidebar-link' to="/users" onClick={showList}>
            <TiContacts className='icon' /> User List
          </Link>
        </li>
        <li className='sidebar-list-item' style={{padding:'5px'}}>
          <Link className='sidebar-link' to="/clients" onClick={showList}>
            <TiContacts className='icon' /> Client List
          </Link>
        </li>
 
      </div>
       
   
      </ul>
    </aside>
  );
}

export default Sidebar;
