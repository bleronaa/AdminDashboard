import React, { useEffect, useState } from 'react';
import './Categories.css'
import axiosInstance from './Axios';
import 'toastr/build/toastr.min.css'; // Import Toastr CSS
import toastr from 'toastr'; // Import Toastr
import { useNavigate, useParams } from 'react-router-dom';

const EditCategory = () => {
  const { categoryId } = useParams(); // Extract the 'categoryId' from the URL
  const [categoryDetails, setCategoryDetails] = useState(null); // State to store category details
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const navigate = useNavigate();

  // Fetch category details based on categoryId
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axiosInstance.get(`/Category/getCategoryDetails?id=${categoryId}`);
        setCategoryDetails(response.data); 
        setCategoryName(response.data.categoryName); // Initialize form fields with fetched data
        setCategoryDescription(response.data.categoryDescription);
        console.log('Category details:', response.data);
      } catch (error) {
        console.error('Error fetching category details:', error);
        toastr.error('Failed to fetch category details');
      }
    };

    fetchCategoryDetails();
  }, [categoryId]);

  // Handle edit category
  const handleEditCategory = async () => {
    try {
      const response = await axiosInstance.post('/Category/editCategory', {
        id: categoryId,
        categoryName: categoryName,
        categoryDescription: categoryDescription
      });

      if (response.data.success) {
        toastr.success(response.data.message);
        navigate('/Categories');
      }
    } catch (error) {
      console.error('Error editing category:', error);
      toastr.error('Failed to edit category');
    }
  };

  // Check if categoryDetails is null (loading state)
  if (!categoryDetails) {
    return <p>Loading category details...</p>;
  }

  return (
    <main className='main-container'>
      <div className="relative m-10 max-w-lg rounded-md border text-gray-800 shadow-lg adduser">
        <p className="mt-4 pl-4 text-xl font-bold">Edit Category</p>
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-0 m-3 h-6 w-6 cursor-pointer text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <div className="flex flex-col items-center px-8 py-10">
          <label className="block w-full" htmlFor="name">
            <p className="mb-1 text-sm text-gray-600">Category Name</p>
            <input
              className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </label>
          <label className="mt-4 block w-full" htmlFor="description">
            <p className="mb-1 text-sm text-gray-600">Category Description</p>
            <input
              className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              type="text"
              placeholder="Category Description"
            />
          </label>

          <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <button className="whitespace-nowrap rounded-md bg-blue-500 px-4 py-3 font-medium text-white" onClick={handleEditCategory}>
              Edit Category
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditCategory;
