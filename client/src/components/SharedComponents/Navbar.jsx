import React, { useState } from 'react'
import { Globe, Menu, X } from 'lucide-react'
import Logo from '../../assets/Logo.svg'
import LogoBlack from '../../assets/LogoBlack.svg'
import MenuBG from '../../assets/MenuBG.svg'

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex justify-between bg-[#32522D] p-3 sticky top-5 z-50  w-full px-5 rounded-lg bg items-center'>
        <img src={Logo} alt="Indian Government Logo" />
        {/* Desktop nav */}
        <div className='hidden md:flex items-center gap-6'>
          <a href="/" className='text-orange-500 font-karla text-lg font-medium '>Home</a>
          <a href="https://nrega.dord.gov.in/" className='text-orange-500 font-karla text-lg font-medium '>About</a>
          {/* <a href="#" className='text-orange-500 font-karla text-lg font-medium '>Contact</a> */}
          <a href="#" className='px-4 py-1 text-black flex font-karla text-lg items-center justify-center gap-2 font-medium bg-orange-500 rounded-full'><Globe size={18}/>English</a>
        </div>
        {/* Mobile hamburger */}
        <button aria-label="Open menu" className='md:hidden inline-flex items-center justify-center p-2 rounded !text-orange-500' onClick={()=> setOpen(true)}>
          <Menu color='white' className='text-white' size={24} />
        </button>

        {/* Overlay */}
        {open && (
          <button aria-label="Close menu" className='fixed inset-0 !text-white md:hidden' onClick={()=> setOpen(false)} />
        )}

        {/* Slide-in sidebar */}
        <div style={{backgroundImage: `url(${MenuBG})`, backgroundSize: 'cover'}} className={`fixed top-0 right-0 h-full w-72 max-w-[80%]  shadow-xl md:hidden transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex items-center justify-between p-4'>
            <img src={LogoBlack} alt="Indian Government Logo" className='h-12'/>
            <button aria-label="Close menu" className='inline-flex items-center justify-center p-2 rounded text-orange-500' onClick={()=> setOpen(false)}>
              <X color='black' className='text-black' size={24} />
            </button>
          </div>
          <nav className='flex flex-col items-center gap-4 p-4'>
            <a href="/" className=' text-black font-karla text-lg font-medium' onClick={()=> setOpen(false)}>Home</a>
            <a href="https://nrega.dord.gov.in/" className=' text-black font-karla text-lg font-medium' onClick={()=> setOpen(false)}>About</a>
            {/* <a href="#" className=' text-black font-karla text-lg font-medium' onClick={()=> setOpen(false)}>Contact</a> */}
            <a href="#" className='px-4 py-2 mt-2 text-black flex font-karla text-lg items-center justify-center gap-2 font-medium bg-orange-500 rounded-full' onClick={()=> setOpen(false)}><Globe size={18}/>English</a>
          </nav>
        </div>

    </div>
  )
}

export default Navbar
