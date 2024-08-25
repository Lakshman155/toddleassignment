import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Editmodule = ({open,setOpen}) => {

const dispatch=useDispatch()
    const [name, setName] = useState('');

const handleInputChange = (e) => {
  setName(e.target.value);
};


const handleSubmit = (e) => {
  e.preventDefault();
  alert(`Submitted: ${name}`);
  
  handleClose(); // Close the modal after submission
};

  return(



        <div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Enter new Name:</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={(e)=>{handleClose()}}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
     
    </div>
 





  
  
  )
}

export default Editmodule;
