import React from 'react'

export default function footer() {
  return (
    <div>
        <hr/>
        <p className="text-center text-gray-500 text-sm mt-4">
            &copy; {new Date().getFullYear()} Task App. All rights reserved.
            <br />
            <span className="mt-2 inline-block">Developed with care</span>
        </p>
    </div>
  )
}
