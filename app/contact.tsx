"use client"
import gsap from 'gsap'
import React from 'react'
import LinkButtonContact from './components/linkButtonContact'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)
function Contact() {
    const listItems = [{
        title:'Github',
        link:'https://github.com/Eyad-khaled'
    }, {
        title:'LinkedIn',
        link:'https://linkedin.com/in/eyad-elgendy-891a38305'
    },{
        title:'WhatsApp',
        link:'https://wa.me/201008669238'
    },{
        title:'ekmelgendy@gmail.com',
        link:'mailto:ekmelgendy@gmail.com'
    },]
    useGSAP(()=>{
        const container = document.getElementById('contact')
        const eyad = document.getElementById('eyad-contact')
        const elgendy = document.getElementById('elgendy')
        const eyadSplit = SplitText.create(eyad, {type:'chars'})
        const elgendySplit = SplitText.create(elgendy, {type:'chars'})
        const listItems = gsap.utils.toArray('.hover-text-contact')
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: container,
                start:'top top',
                end:'=+1000px',
                pin:true,
                scrub:true,
                
            }
        })
          tl.from(listItems,{
            autoAlpha:0,
            xPercent:-100,
            // duration:0.2,
            stagger:{
                amount:0.5,
            }
          }).from(eyadSplit.chars,{
            autoAlpha:0,
            yPercent:100,
            // duration:0.2,
            stagger:{
                amount:0.5,
                from:'end'
            }
        },"<").from(elgendySplit.chars,{
            autoAlpha:0,
            yPercent:100,
            // duration:0.2,
            stagger:{
                amount:0.5,
                from:'start'
            }
        },"<")

    })

    return (
        <div id='contact' className="h-[90vh] md:h-screen w-full relative bg-black mt-10">
           <ul className='flex justify-around items-center text-white pt-10 flex-wrap gap-10'>
            {listItems.map((item)=>(
                <LinkButtonContact href={item.link} name={item.title} key={item.title}/>
            ))}
           </ul>
          <div className="full-name absolute bottom-4 lg:bottom-10 left-1/2 transform -translate-x-1/2 flex justify-between px-10 w-full items-center text-[12vw] font-bold">
           <h1 id='eyad-contact'  className="font-archivo-black">Eyad</h1>
           <h1 id='elgendy' className="font-cursive">Elgendy</h1>
            
          </div>

        </div>
    )
}

export default Contact
