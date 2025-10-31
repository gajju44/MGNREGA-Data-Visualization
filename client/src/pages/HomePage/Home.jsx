import React from 'react'
import LandingPage from '../../components/HomePage/LandingPage'
import Navbar from '../../components/SharedComponents/Navbar'
import DistrictDashboard from '../../components/HomePage/DistrictDashboard'
import FillerWhite from '../../assets/FillerWhite.svg'
import FillerOrange from '../../assets/FillerOrange.svg'
import FillerOrangeHalf from '../../assets/FillerOrangeHalf.svg'
import FillerGreen from '../../assets/FillerGreen.svg'
import GreenDot from '../../assets/GreenDot.svg'
import Footer from '../../components/SharedComponents/Footer'

function Home() {
  return (
    <div className='flex flex-col gap-10 '>
       <div className=' px-5 md:px-10 pt-4 sticky top-0 z-50'><Navbar/></div> 
        <div className='flex px-5 md:px-10 relative items-center justify-center h-fit w-full'>
           <img src={FillerWhite} alt="filler object" className='absolute hidden lg:block top-5 left-32 z-[-1] ' />
                  <img src={FillerWhite} alt="filler object" className='absolute  -bottom-20 right-32 z-[-1] ' />
                  <img src={FillerOrange} alt="filler object" className='absolute hidden lg:block bottom-12 w-20 left-1/3 z-[-1] ' />
                  <img src={FillerOrangeHalf} alt="filler object" className='absolute bottom-[20%] lg:top-10 right-0  z-[-1] ' />
                  <img src={GreenDot} alt="filler object" className='absolute bottom-48   left-1/2 z-[-1] ' />
                  {/* <img src={GreenDot} alt="filler object" className='absolute bottom-10 w-4   left-[20%] z-0 ' /> */}
                  <img src={GreenDot} alt="filler object" className='absolute top-16 w-3  left-[36%] z-[-1] ' />
                  <img src={GreenDot} alt="filler object" className='absolute top-0 w-3  right-[8%] z-[-1] ' />
                  <img src={FillerGreen} alt="filler object" className='absolute hidden lg:block -bottom-1/3 left-0 z-[-1] ' />
                

      <LandingPage />
      </div>

      <div className=" px-5 md:px-10"><DistrictDashboard /></div>
     
     <Footer/>
    </div>
  )
}

export default Home
