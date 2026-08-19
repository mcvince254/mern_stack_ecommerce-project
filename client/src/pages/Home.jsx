import react, {useState, useEffect } from 'react'
import Footer from '../components/Footer'
import '../pageStyles/Home.css'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider.jsx'
import Product from '../components/Products'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/products/productSlice'



function Home(){   
        const {loading,error,products,productCount}=useSelector((state)=>state.product)
         const dispatch=useDispatch();
         useEffect(()=>{
               dispatch(getProduct())  
         }, [dispatch])
        return (
        <>
        <Navbar/>
        <ImageSlider/>
        <div className='home-container'>
            <h2 className='home-heading'>Trending Now</h2>
            <div className="home-product-container">
                { products.map((product,index)=>(
                    <Product product = {product} key={index}/>
                ))}
            </div>
            <Footer/>
        </div>
        </>
    )
}


 export default Home