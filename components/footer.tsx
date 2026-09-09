import React from 'react'
import Image from 'next/image'

export default function footer() {
  return (
    <div>
        <hr className="mt-10" w-100/>
        <p className="text-center text-gray-500 text-sm mt-4">
            &copy; {new Date().getFullYear()} Task App. All rights reserved.
            <br />
            <Image
              src="dev"
              alt="dev"
              width={100}
              height={50}
              className="mx-auto"
            />
        </p>
    </div>
  )
}
