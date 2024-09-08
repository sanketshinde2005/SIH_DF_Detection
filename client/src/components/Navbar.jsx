import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu, } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";



function Navbar() {
const [isopen, setIsopen] = useState(false);
const toggleMenu = ()=>{
  setIsopen(!isopen);
}
  return (
    <div className='md:flex justify-between  pt-8 pl-10 pr-10 md:flex-row h-20 flex flex-col gap-5 w-[100vw] ' >
        <h1 className='text-[#398D8D] md:text-2xl italic font-bold text-xl '
        >Homies Deepfake Detection</h1>
        
            <ul className={`flex md:gap-10 flex-col md:flex-row   transition-transform  duration-150 ease-in ${isopen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 md:flex'} md:active md:translate-y-0 md:opacity-100 flex flex-col gap-5  `}>
                <li className='text-[#398D8D]  text-[1.2rem] font-bold italic leading=[24.2px]'><Link to="/">Home</Link></li>
                <li className='text-[#398D8D] text-[1.2rem]  font-bold italic leading=[24.2px]'><Link to="/About">About</Link></li>
                <li className='text-[#398D8D]  text-[1.2rem]  font-bold italic leading=[24.2px]'><Link to="/Contact">Contact Us</Link></li>
            </ul>
            <div onClick={toggleMenu} className='md:hidden absolute right-8 top-9 '>
            {isopen ? <FaTimes /> : <FaBars />}
           
            </div>
            
            
           
    </div>
  )
}

export default Navbar