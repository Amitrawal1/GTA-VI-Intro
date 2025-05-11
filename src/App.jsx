import React, { useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'

function App() {
  let [showContent, setShowContent] = useState(false);
  useGSAP(()=>{
    const tl =gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration:2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    })
    .to(".vi-mask-group",{
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity:0,
      onUpdate: function(){
        if(this.progress() >= 0.9){
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    })
  })


  useGSAP(()=>{
    if(!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration:2,
      delay:-1,
      ease: "expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration:2,
      delay:-1.7,
      ease: "expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration:2,
      delay:-1,
      ease: "expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 0.8,
      x:"-50%",
      bottom:"-55%",
      rotate: 0,
      duration:2,
      delay:"-.8",
      ease: "expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration:2,
      delay:"-.8",
      ease: "expo.easeInOut",
    });

    




    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", function(e){
      
      const xMove = (e.clientX / window.innerWidth -0.5)*40;
      gsap.to(".main .text", {
        x: `${xMove *0.4}`,
      })
      gsap.to(".sky", {
        x: `${xMove *0.4}`,
      })
      gsap.to(".bg", {
        x: `${xMove *0.7}`,
      })
      console.log(xMove);
    })
  }, [showContent]);

  return (
    <>
      <div className="svg flex item-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000] ">
        <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
          <defs>
            <mask id='viMask'>
              <rect width="100%" height="100%" fill="black" />
              <g className='vi-mask-group'>
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="pink"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                 >VI</text>
              </g>
            </mask>
          </defs>
          <image 
            href='./bg.png'
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
            />
        </svg>
      </div>
      {showContent && (
        <div className="main rotate-[-10deg] scale-[1.7] w-full ">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10 ">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-10 h-2 bg-white"></div>
                  <div className="line w-7 h-2 bg-white"></div>
                </div>
                <h3 className='text-4xl text-white -mt-[9px] leading-none '>Rockstar</h3>
              </div>
              
            </div>                      
            <div className="imagesDiv relative overflow-hidden w-full h-screen ">
              <img className='sky absolute scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover' src="./sky.png" alt="" /> 
              <img className='bg absolute scale-[1.8] rotate-[-3deg] top-0 left-0 w-full h-full object-cover' src="./bg.png" alt="" />
              <div className="text text-white flex flex-col gap-3  absolute top-11 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg] ">
              <h1 className='text-[7rem] leading-none -ml-40'>grand</h1>
              <h1 className='text-[7rem] leading-none -ml-20'>theft</h1>
              <h1 className='text-[7rem] leading-none -ml-40'>auto</h1>
            </div>
              <img className='character absolute -bottom-[150%] left-1/2 -translate-x-1/2 scale-[3] rotation-[-20deg] ' src="./girlbg.png" alt="" />
            </div>
            <div className="btmbar text-white w-full py-10 px-10   absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent">
              <div className='flex gap-4 item-center'>
              <i className="text-4xl ri-arrow-down-line"></i>
              <h3 className='text-xl font-[Helvetica]'>Scroll Down</h3>
              </div>
              <img className='h-[50px] absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' src="./ps5.png" alt="" />
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default App
