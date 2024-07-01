import Hero from "@/components/Hero";
import Main from "@/components/Main";
import LocomotiveScroll from 'locomotive-scroll';


export default function Home() {
  
  return (
  <main  className='max-w-full max-h-dvh relative left-0 bg-black-100 flex justify-center items-center flex-col overflow-hidden '>
<div className="max-w-fll absolute">
<Hero/>
</div>
  <div className="h-[150rem] w-[150rem] dark:bg-black bg-white dark:bg-grid-white/[0.3] bg-grid-black/[0.3] relative flex items-center justify-center opacity-10">
    {/* Radial gradient for the container to give a faded look */}
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"/>
    
    
    
</div>
  </main>
  );

  
}
