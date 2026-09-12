"use client"
import Landing from "./landing";
import About from "./about";
import { useEffect, useState } from "react";
import Products from "./products";

export default function Home() {
  const [isDone, setIsDone] = useState(false)
  return (
   <div className="bg-[#d5cfbe] overflow-x-hidden">
     <Landing setIsDone = {setIsDone}/>
       
    {isDone && <div>
      
      <About/>    
      <Products/>
    </div>}
      
   </div>
  );
}
