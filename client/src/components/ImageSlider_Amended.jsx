 import React, { useEffect, useState } from 'react'
 import '../componentStyles/ImageSlider.css'



const images = [
     "images/homebanner.png",
    "/images/banner2.png",
    "/images/banner5.png",
    "/images/banner6.png",
    "/images/banner7.png"
];
 const ImageSlider = ()=>{

    const [currentIndex,setcurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
useEffect(() => {
    const interval = setInterval(() => {
        setcurrentIndex((prevIndex) => {
            if (prevIndex === images.length - 1) {
                setDirection(-1);
                return prevIndex - 1;
            }

            if (prevIndex === 0) {
                setDirection(1);
                return prevIndex + 1;
            }

            return prevIndex + direction;
        });
    }, 5000);

    return () => clearInterval(interval);
}, [direction]);

    return (
        <div className="image-slider-container">
            <div className="slider-images" style={{transform:`translateX(-${currentIndex*100}%)`}}>
              { images.map((image,index)=>(
                <div className="slider-item" key={index}>
                    <img src={image} alt={`Slide ${index+1}`} />
                </div> 
              ))} 
            </div>

            <div className = "slider-dots">
                {
                    images.map((_,index)=>(
                        <span key={index} className={`dot  ${index === currentIndex?'active': ""}`} onClick ={()=>setcurrentIndex(index)}> </span>
                    ))
                }
            </div>
        </div>
    )
 }

 export default ImageSlider