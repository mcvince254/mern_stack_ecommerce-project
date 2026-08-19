import React, { useState } from 'react'
import { Links,Link } from "react-router-dom";
import '../componentStyles/Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Navbar(){
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const toggleMenu =()=> setIsMenuOpen(!isMenuOpen);
    const isAuthenticated = false;
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to = "/" onClick={()=>setIsMenuOpen(false)}>ShopEasy</Link>
                </div>
                <div className={`navbar-links ${isMenuOpen? "active":""} `}>
                    <ul>
                        <li onClick={()=>setIsMenuOpen(false)}><Link to='/'>Home</Link></li>
                        <li><Link to='/products'>Products</Link></li>
                        <li><Link to='/about-us'>About Us</Link></li>
                        <li><Link to='/contact-us'>Contact Us</Link></li>
                    </ul>
                </div>
                <div className="navbar-icons">
                    { <div className="search-container">
                        <form className="search-form">
                            <input type="text" className='search-input bg-white rounded' placeholder='Search products...' />
                         <button className="search-icon">
                            <SearchIcon />search
                        </button>
                        </form>

                    </div> }
                    <div className="cart-container">
                        <Link to  = "/cart"><p className='icon'><ShoppingCartIcon /></p>
                            <span className='cart-badge'>6</span>
                        </Link>
                    </div>
                    {!isAuthenticated && <Link to ="register"className='register-link'><p className='icon'><PersonAddIcon/></p></Link>}
                    <div className="text-red-600 bg-black rounded" onClick={toggleMenu}>
                        {isMenuOpen ? <p className='icon'><CloseIcon /></p> : <p className='icon'><MenuIcon /></p>  }
                    </div>

               </div>
            </div> 
        </nav>

        
    )
}

export default Navbar