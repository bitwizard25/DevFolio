import Hero from "@/components/Hero";
import Main from "@/components/Main";
import LocomotiveScroll from 'locomotive-scroll';


export default function Home() {
  
  return (
  <main  className='max-w-full max-h-dvh relative left-0 bg-black-100 flex justify-center items-center flex-col overflow-hidden '>
<div className="max-w-fll">
  {/*<Hero />*/}
  <Main />
</div>
  </main>
  );

  
}
