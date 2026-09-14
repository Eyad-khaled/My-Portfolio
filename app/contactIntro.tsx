"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import React from 'react'


gsap.registerPlugin(ScrollTrigger, SplitText)
function ContactCircle() {
    useGSAP(()=>{
        const container = document.getElementById('container')
        const title = document.getElementById('title')
        const paragraph = document.getElementById('paragraph')
        const circle = document.getElementById('circle')
        const paraLines = SplitText.create(paragraph,{type:'lines', mask:'lines'})
       const tl = gsap.timeline({
        scrollTrigger:{
            trigger:container,
            start:'top 25%',
            end:'bottom center',
            scrub:true,
        }
       })
       tl.to(circle,{
        scale:100,
        duration:2,
        ease:'power3.in',
        borderRadius:'10px',
       }).from(title,{
        xPercent:250,
        duration:1,
        ease:'power3.out',
    
       },"<1.3>").to('#page' , {background:"black"},"<").from(paraLines.lines,{
        yPercent:100,
        autoAlpha:0.5,
        stagger:{
            each:0.01
        }
       }).to(paragraph,{
        y:-200,
        duration:3,
        ease:'power2.inOut'
       }, "<")
    })
    

    return (
         <div id='container' className="relative w-full h-[180vh] flex justify-center items-center overflow-hidden rounded-4xl">
        <div id='circle' className="w-10 h-10 bg-white rounded-full top-0">
         
         </div>
         <h1 id='title' className='text-4xl lg:text-6xl font-hand font-bold text-black absolute left-10 top-100'>Contact me</h1>
        <p id='paragraph' className='font-cursive font-semibold text-lg text-black max-w-25 absolute right-50 bottom-20'>  looking for new oppportinities , and Eager to join an innovative team and contribute to ambitious projects.</p>
        </div>
    )
}

export default ContactCircle
