import React from 'react';

import './Categories.css'



const AddCategories = () => {
  return (
    <>
    <main className='main-container'>

    <div class="relative m-10 max-w-lg rounded-md border text-gray-800 shadow-lg adduser">
  <p class="mt-4 pl-4 text-xl font-bold">Add new Category</p>
  <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-0 top-0 m-3 h-6 w-6 cursor-pointer text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
  <div class="flex flex-col items-center px-8 py-10">
    <label class="block w-full" for="name">
      <p class="mb-1 text-sm text-gray-600">Category Name</p>
      <input class="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" placeholder="Enter name" />
    </label>
    <label class="mt-4 block w-full" for="name">
      <p class="mb-1 text-sm text-gray-600">Category Description</p>
      <input class="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" placeholder="Category Description" />
    </label>
    

    <div class="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
      <button class="whitespace-nowrap rounded-md bg-blue-500 px-4 py-3 font-medium text-white">Add Category</button>
    </div>
  </div>
</div>

    </main>
    
    </>
  )
}
  export default AddCategories;