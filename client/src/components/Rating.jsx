import React,{useState} from 'react';
import '../componentStyles/Rating.css'
//import StarIcon from "@mui/icons-material/Star";


const Rating= ({value,onRatingChange,disabled})=>{ 
    const [hoveredRating,setHoveredRating] = useState(0);
    const [selectedRating,setSelectedRating]=useState(value ||0);    
    // Handle star hover
    const handleMouseEnter=(rating)=>{
        if(!disabled){
            setHoveredRating(rating)
        }
    }
    //Hanlde Mouse leave
    const handleMouseLeave=()=>{
        setHoveredRating(0)
    }
    //const handleclick
    const handleClick=(rating)=>{
        if(!disabled){
            setSelectedRating(rating)
            if(onRatingChange){
                onRatingChange(rating)
            }

        }

    }
    //generate stars
    const generateStars=()=>{
        const stars=[];
        for(let i=1;i<=5;i++){
            const isFilled = i<=(hoveredRating || selectedRating)
            stars.push(
                <span 
                key={i}
                className={`star ${isFilled?'filled':'empty'}`}
                onMouseEnter={()=>handleMouseEnter}
                onMouseLeave={()=>handleMouseLeave}
                onClick={()=>handleClick}
                style = {{pointerEvents:disabled?'none':'auto'}}
                >★</span>
            )
        } 
        return stars
    }
    return(

        <div>
            <div className='star'>{generateStars()}</div>
        </div>
    )
}
export default Rating 

