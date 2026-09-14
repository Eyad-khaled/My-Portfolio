"use client"
import Landing from "./landing";
import About from "./about";
import { useState } from "react";
import Products from "./projects";
import Skills from "./skills";
import ContactCircle from "./contactIntro";
import Contact from "./contact";


export default function Home() {
  const [isDone, setIsDone] = useState(false)
  return (
   <div id="page" className="bg-[#d5cfbe] overflow-x-hidden">
     <Landing setIsDone = {setIsDone}/>
       
    {isDone &&
     <div>
      
      <About/>    
      <Products/>
      <Skills/>
      <ContactCircle/>
      <Contact/>
    </div>
     } 
      
   </div>
  );
}
