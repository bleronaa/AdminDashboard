import React, { useState } from 'react';
import './Users.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './Axios';
import toastr from 'toastr'; // Import toastr

function AddUsers() {
    const navigate = useNavigate();

    // State to hold form data
    const [userData, setUserData] = useState({
        UserName: '',
        UserLastName: '',
        Email: '',
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/User/addUserRequest', userData);
            console.log(response.data);
            if (response.data.success) {
                // Show success notification
                toastr.success(response.data.message);
                // Navigate to users page
                navigate('/users');
            } else {
                // Show error notification if success is false
                toastr.error(response.data.message || 'Failed to add user.');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            // Show error notification for network or server error
            toastr.error('An error occurred while adding the user.');
        }
    };

    return (
        <main className='main-container'>
            <div className="relative m-10 max-w-lg rounded-md border text-gray-800 shadow-lg adduser">
                <p className="mt-4 pl-4 text-xl font-bold">Add new user</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-0 top-0 m-3 h-6 w-6 cursor-pointer text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                <form className="flex flex-col items-center px-8 py-10" onSubmit={handleSubmit}>
                    <label className="block w-full" htmlFor="UserName">
                        <p className="mb-1 text-sm text-gray-600">First Name</p>
                        <input
                            className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                            type="text"
                            name="UserName"
                            value={userData.UserName}
                            onChange={handleChange}
                            placeholder="Enter name"
                            required
                        />
                    </label>
                    <label className="block w-full" htmlFor="UserLastName">
                        <p className="mb-1 text-sm text-gray-600">Last Name</p>
                        <input
                            className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                            type="text"
                            name="UserLastName"
                            value={userData.UserLastName}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            required
                        />
                    </label>
                    <label className="mt-4 block w-full" htmlFor="Email">
                        <p className="mb-1 text-sm text-gray-600">Email Address</p>
                        <input
                            className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                            type="email"
                            name="Email"
                            value={userData.Email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
                    </label>

                    <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                        <button
                            type="submit"
                            className="whitespace-nowrap rounded-md bg-blue-500 px-4 py-3 font-medium text-white"
                        >
                            Add User
                        </button>
                        <button
                            onClick={() => navigate('/users')}
                            className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium"
                        >
                            Cancel Operation
                        </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">Password will be sent to their email</p>
                </form>
            </div>
        </main>
    );
}

export default AddUsers;
