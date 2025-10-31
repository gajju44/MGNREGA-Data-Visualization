import React from 'react'

function Footer() {
  return (
    <div className='flex flex-col gap-2 items-center border-t border-[#5d7e5d] justify-center py-6 p-10'>
      
      <div className='flex gap-10 '>
     <a href="#" className=' font-karla text-lg font-medium' onClick={()=> setOpen(false)}>Home</a>
            <a href="https://nrega.dord.gov.in/" className=' font-karla text-lg font-medium' onClick={()=> setOpen(false)}>About</a>
            {/* <a href="#" className='  font-karla text-lg font-medium' onClick={()=> setOpen(false)}>Contact</a> */}
       </div> 
        <p>Copyright &copy; 2025. All Rights Reserved</p>

    </div>
  )
}

export default Footer
