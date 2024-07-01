import React from 'react'

const main= () => {
  return (
    <div className="h-[150rem] w-[150rem] dark:bg-black bg-white dark:bg-grid-white/[0.3] bg-grid-black/[0.3] relative flex items-center justify-center opacity-45">
    {/* Radial gradient for the container to give a faded look */}
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
    
    </div>
  )
}

export default main