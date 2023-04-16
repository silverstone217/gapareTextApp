import React, {useState, useEffect} from 'react';
import {isMobile} from 'react-device-detect';
import {isDesktop} from 'react-device-detect';
import {isTablet} from 'react-device-detect';
import "./NotPage.css";

function NoPage() {
  const [color, setColor]= useState("black");
  const [bcolor, setBColor]= useState("lightgreen");

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(prevColor => prevColor === "black"? "yellow": "black");
      setBColor(prevColor => prevColor === "lightgreen"? "dodgerblue": "lightgreen");
    }, 2000)
    return ()=> clearInterval(interval);
  },[]);

 if(isMobile){
  return (
    <div className='Mobile' style={{backgroundColor: bcolor}}><div  className='notfound' style={{color: color}}>
    404 Page Not Found 
   </div>
   </div>
  )
 }
 else if(isDesktop){
  return (
    <div className='Deskop' style={{backgroundColor: bcolor}}>
      <div className='notfound ' style={{color: color}}>
       404 Page Not Found 
      </div>
    </div>
  )
 }
 else if(isTablet){
  return (
    <div className='Tablet'style={{backgroundColor: bcolor}}><div className='notfound' style={{color: color}}>
    404 Page Not Found 
   </div></div>
  )
 }
 else{
  return (
    <div className='Computer'style={{backgroundColor: bcolor}}><div className='notfound' style={{color: color}}>
    404 Page Not Found 
   </div></div>
  )
 }
}

export default NoPage