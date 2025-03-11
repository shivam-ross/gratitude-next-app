'use client'

import { useEffect } from "react"
import anime from "animejs";

export function Loading(){

    useEffect(() => {
        const fireNodes1 = document.querySelectorAll("#fireNodes1 .cf-flame");
const fireNodes2 = document.querySelectorAll("#fireNodes2 .cf-flame");
const fireNodes3 = document.querySelectorAll("#fireNodes1 .cf-flame");
const baseFire = document.querySelectorAll("#base-fire .cf-flame");

function animateBaseFire() {
   anime({
    targets: baseFire,
    delay: anime.stagger(300),
    translateY: function(){return anime.random(0, -10);},
    keyframes: [
    {scale: .8},
    {scale: .825},
    {scale: .9},
    {scale: .925},
    {scale: 1}
  ],
  duration: 300,
  easing: 'easeInOutSine',
  loop: true,
  })
}

function animateFlame1() {
   anime({
    targets: fireNodes1,
    delay: anime.stagger(100),
    translateY: function(){return anime.random(0, 300);},
    rotate:30,
    opacity:function(){return anime.random(.5, 1);},
    translateX: function(){return anime.random(0, -60);},
    scale:0,
    skew: function () {return anime.random(0, 10);},
    loop: true,
    easing: "easeInOutSine",
  })
}

function animateFlame2(){
   anime({
    targets: fireNodes2,
    delay: anime.stagger(400),
    keyframes: [
        { translateX: anime.random(-30, 0), translateY: anime.random(0, -260) },
        { translateX: anime.random(0, -30), translateY: anime.random(-260, -160) },
      ],
    scale:0,
    rotate: function() { return anime.random(0, 60); },
    skew:function(){
      return anime.random(0, 30);
    },
    loop: true,
    easing: "easeInOutSine"
  })
}

function animateFlame3() {
   anime({
    targets: fireNodes3,
    delay: anime.stagger(500),
    translateY: function(){return anime.random(-300, -200);},
    opacity:function(){return anime.random(0, 1);},
    translateX: function(){return anime.random(-50, 50);},
    scale:0,
    rotate: function() { return anime.random(0, -30); },
    skew: function () {return anime.random(0, 20);},
    loop: true,
    easing: "easeInOutSine",
  })
}

animateFlame1();
animateFlame2();
animateFlame3();
animateBaseFire();

    },[])

    return(
    <div className="mainbody">
<div className="cf-container">
  <div className="cf-flame-container"  id="fireNodes1">
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
  </div>
  <div className="cf-flame-container" id="fireNodes2">
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
  </div>
  <div className="cf-flame-container" id="base-fire">
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
    <div className = "cf-flame"></div>
  </div>
  <div className= "cf-log-container">
    <div className="cf-log"></div>
    <div className="cf-log"></div>
  </div>
</div>
<div className="absolute left-1/2 translate-x-[-50%] bottom-[10%] w-full">
    <h1 className="text-lg text-yellow-100 font-sans font-semibold text-center">&quot;The root of joy is gratefulness&quot;</h1>
    <p className="text-sm font-sans text-yellow-300 text-center">David Stendl-Rast</p>
</div>
      <style jsx>{`
        .mainbody {
  background-color: #372113;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.cf-container {
  box-sizing: content-box;
  width: 300px;
  height: 300px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cf-container .cf-flame-container {
  width: 100px;
  height: 100px;
  bottom: 0px;
  position: absolute;
}

.cf-container .cf-log-container {
  width: 60%;
  height: 100px;
  position: absolute;
  bottom: 0px;
  left: 50px;
}

.cf-container .cf-flame-container#base-fire .cf-flame:nth-child(1) {
  background: #c63509;
  opacity: 0.95;
}

.cf-container .cf-flame-container#base-fire .cf-flame:nth-child(2) {
  background: #cd4015;
  width: 100px;
  height: 100px;
  opacity: 0.85;
  left: 75px;
}

.cf-container .cf-flame-container#base-fire .cf-flame:nth-child(3) {
  background: #d73e0f;
  width: 60px;
  height: 60px;
  opacity: 0.85;
  left: 130px;
}

.cf-container .cf-flame-container:nth-child(2) {
  width: 150px;
  height: 150px;
  bottom: 0px;
  position: absolute;
}

.cf-container .cf-flame-container:nth-child(2) .cf-flame {
  width: 75px;
  height: 75px;
  left: 75px;
}

.cf-log {
  background: #723830;
  width: 100%;
  height: 30px;
  transform-origin: center;
  position: absolute;
  bottom: 0px;
  border-radius: 0.5em;
  box-shadow: 0 3px 10px #372113;
}

.cf-log:nth-child(1) {
  transform: rotate(15deg);
}

.cf-log:nth-child(2) {
  transform: rotate(-15deg);
}

.cf-flame:nth-child(1) {
  background: #f5ed8f;
}

.cf-flame:nth-child(2) {
  background: #fde239;
}

.cf-flame:nth-child(3) {
  background: #ffdc01;
}

.cf-flame:nth-child(4) {
  background: #fdac01;
}

.cf-flame:nth-child(5) {
  background: #d73e0f;
}

.cf-flame:nth-child(6) {
  background: #cd4015;
}

.cf-flame:nth-child(7) {
  background: #c63509;
}

.cf-flame:last-child {
  background: #c63509;
}

.cf-flame {
  background: #cd4015;
  width: 100px;
  height: 100px;
  border-radius: 1em;
  position: absolute;
  bottom: 0px;
  left: 100px;
}

#fireNodes2 .cf-flame {
  animation: flameColor 1.5s ease-out infinite;
}

@keyframes flameColor {
  0% {
    background: #c63509;
  }
  20% {
    background: #cd4015;
  }
  30% {
    background: #fdac01;
  }
  50% {
    background: #ffb401;
  }
  60% {
    background: #fdac01;
  }
  70% {
    background: #ffdc01;
  }
  80% {
    background: #fde239;
  }
  100% {
    background: #f5ed8f;
  }
}

      `}</style>
    </div>
)}