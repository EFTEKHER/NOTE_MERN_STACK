import React from 'react'
import { ZapIcon } from 'lucide-react'
const RateLimitedUI = () => {
  return (
    // make a beautiful notification ratelimit too many requests UI with tailwind css and using icon with daisyui with responsive to all devices //top center of the screen ad
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="max-w-md p-4 text-center  rounded-lg shadow-lg bg-[#1D803E] border border-warning">
        <ZapIcon className="w-12 h-12 mx-auto text-warning" />
        <h2 className="mt-2 text-lg font-semibold text-warning">
          Too Many Requests
        </h2>
        <p className="mt-1 text-sm text-base-content">
          You are being rate limited. Please try again later.
        </p>
      </div>
    </div>
  )
}

export default RateLimitedUI
