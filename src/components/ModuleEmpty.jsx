import React from 'react'
import fileempty from './fileempty.jpg'

const ModuleEmpty=()=> {
  return (
    <div className='min-h-screen flex items-center justify-center'>
    
                    <div className="text-center">
                        <img
                        src={fileempty}
                            alt="Open box illustration"
                            className="w-64 mx-auto mb-8"
                        />
                        <p className="text-xl font-semibold text-gray-800">
                            Nothing added here yet
                        </p>
                        <p className="text-sm text-gray-600">
                            Click on the [+] Add button to add items to this course
                        </p>
                    </div>
                
    
    
    </div>
  )
}

export default ModuleEmpty;