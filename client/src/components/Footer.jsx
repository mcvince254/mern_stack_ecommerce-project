import react from 'react'
import '../componentStyles/Footer.css'


function Footer(){
    return(
        <footer className='footer'>
            <div className="footer-container">
                {/*Section 1*/}
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p> Phone: 254746438899</p>
                    <p>Email: mcvincem@gmail.com</p>
                </div>
                {/*Section 2*/}
                <div className="footer-section social">
                    <h3>Follow me</h3>                   
                    <div className="social-links">
                         <a href="" target="_blank"><p>github</p></a>
                         <a href="" target="_blank"><p>utube</p></a>
                    </div>  
                </div>
                {/*Section 3*/}
                <div className="footer-section about">
                    <h3>About</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi eligendi inventore expedita rem.</p>
                </div>


            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 vtwebdevelopers. All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer 