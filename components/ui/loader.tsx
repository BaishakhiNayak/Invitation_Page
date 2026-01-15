      import React from 'react'
      
      const loader = () => {
        return (
          <>
          <div className="flex justify-center items-center h-60">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
          </>
        )
      }
      
      export default loader