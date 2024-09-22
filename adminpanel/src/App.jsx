import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import ApproveArtItems from './ArtItems';
import './App.css';
import './index.css'; // Import Tailwind styles last
import Users from './Users';
import Auctions from './Auctions';
import AddAuctions from './AddAuction';
import AddUsers from './AddUser';
import AddCategories from './AddCategories';
import Categories from './Categories';
import ArtItems from './ArtItems';



function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isLoggedIn] = useState(true);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Header openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/artItems" element={<ArtItems/>}/>
          <Route path="/Users" element={<Users/>}/>
          <Route path="/Auctions" element={<Auctions/>}/>
          <Route path="/addAuction" element={<AddAuctions/>}/>
          <Route path="/addUser" element={<AddUsers/>}/>
          <Route path="/addCategory" element={<AddCategories/>}/>
          <Route path="/Categories" element={<Categories/>}/>






        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
