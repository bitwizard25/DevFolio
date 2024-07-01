import React from 'react'
import {BackgroundGradientAnimation} from "@/components/ui/BackgroundGradientAnimation.tsx";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const hero = () => {
  return (
    <BackgroundGradientAnimation >
      <div className="h-screen w-full absolute z-10 inset-0 flex  flex-col items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20  font-serif">
          Welcome→DevFolio
        </p>
        <div className='max-w-5xl max-h-24 flex flex-col justify-center items-center relative'>
        <TextGenerateEffect 
        className=''
        words="2024 graduate,seeking for opportunities , believe in tackling challenges head-on which fuel's intellectual growth and sharpen problem-solving abilities.  open to collaborate on challenging projects to  create solutions."
        />
        </div>
      </div>
    </BackgroundGradientAnimation>
  )
}

export default hero