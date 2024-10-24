import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import ArtItems from './ArtItems';
import Clients from './Clients';
import Users from './Users';
import Auctions from './Auctions';
import AddAuctions from './AddAuction';
import AddUsers from './AddUser';
import AddCategories from './AddCategories';
import Categories from './Categories';
import EditAuction from './EditAuction';
import EditCategory from './EditCategory';
import Login from './Login';
import './App.css';
import './index.css'; // Import Tailwind styles last
import ArtItemDetails from './ArtItemsDetails';

function MainContent({ openSidebarToggle, OpenSidebar }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/Login";

  return (
    <div className="grid-container">
      {/* Only show the Header and Sidebar if not on the Login page */}
      {!isLoginPage && (
        <>
          <Header openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        </>
      )}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/artItems" element={<ArtItems />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Clients"element={<Clients/>}/>
        <Route path="/Auctions" element={<Auctions />} />
        <Route path="/addAuction" element={<AddAuctions />} />
        <Route path="/addUser" element={<AddUsers />} />
        <Route path="/addCategory" element={<AddCategories />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/editAuction/:auctionId" element={<EditAuction />} />
        <Route path="/editCategory/:categoryId" element={<EditCategory />} />
        <Route path="/artitemdetails/:artItemId" element={<ArtItemDetails />}/>

        {/* Render Login without sidebar */}
        <Route path="/Login" element={<Login />} />
        {/* Default to Login for any unmatched route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <MainContent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
    </Router>
  );
}

export default App;
