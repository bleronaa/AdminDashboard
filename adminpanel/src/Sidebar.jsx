import React from 'react'
import 
{BsCart3, BsGrid1X2Fill,  BsFillGrid3X3GapFill, BsPeopleFill, 
    BsFillGearFill}
 from 'react-icons/bs'
 import { PiPaintBrushDuotone } from "react-icons/pi";
 import { TiContacts } from "react-icons/ti";
import Logo from '../src/images/imglogo.png';


function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img src={Logo} className='icon_header'/> 
               
               
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <PiPaintBrushDuotone className='icon'/> Auctions
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <TiContacts className='icon'/> Contact
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Admin
                </a>
            </li>
            
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar