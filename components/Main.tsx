import React from 'react'

const main= () => {
  return (
    <div className="h-[50rem] w-[150rem] dark:bg-black bg-white dark:bg-grid-white/[0.8] bg-grid-black/[0.4] relative flex items-center justify-center">
    {/* Radial gradient for the container to give a faded look */}
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
    <p className="text-gray-200 text-4xl sm:text-7xl  font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
      Backgrounds
    </p>
    </div>
  )
}

export default main