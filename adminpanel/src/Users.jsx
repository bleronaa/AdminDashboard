import React, { useEffect, useState } from 'react'
import './Users.css'
import { useNavigate } from 'react-router-dom';
import axiosInstance from './Axios';

function Users(){

  const [users, setUsers] = useState([]);

  useEffect(() => {
      const fetchUsers = async () => {
          try {
              const response = await axiosInstance.get('/user/getUserList');
              console.log('user List:', response.data);

              setUsers(response.data); 
           
          } catch (error) {
              console.error('Error fetching client list:', error);
              toastr.error('An error occurred while fetching the client list.');
          }
      };

      fetchUsers();
  }, []); // Empty d
  const navigate=useNavigate();
  const handleAddUserClick = () => {
    navigate('/adduser'); // Redirect to /adduser on button click
  };
            return(
                <>

<main className='main-container'>
<div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
  <div class="flex items-center justify-between pb-6">
    <div style={{display:'flex',justifyContent:'end',width:'100%'}}>
      {/* <button >Add User</button> */}
      <button onClick={()=>handleAddUserClick()} className="whitespace-nowrap rounded-md bg-blue-500 px-2 py-2 font-medium text-white">
            Add New User
          </button>
      
    </div>
   
  </div>
  <div class="overflow-y-hidden rounded-lg border">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
            <th class="px-5 py-3">First Name</th>
            <th class="px-5 py-3">Last Name</th>
            <th class="px-5 py-3">Email</th>
            <th class="px-5 py-3">Role</th>
          </tr>
        </thead>
        <tbody class="text-gray-500">
          {users.map((user)=> (
          <tr>
          
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0">
                  <img class="h-full w-full rounded-full" src="/images/imglogo.png" alt="" />
                </div>
                <div class="ml-3">
                  <p class="whitespace-no-wrap">{user.firstName}</p>
                </div>
              </div>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">{user.lastName}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">{user.email}</p>
            </td>

            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <span class="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">{user.role}</span>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  
  </div>
</div>




 
</main>

              
                
                </>
            )
}

export default Users;


