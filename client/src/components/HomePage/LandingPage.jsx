import React from 'react'
import HeroImage from '../../assets/HeroImage.svg'
import { useLanguage } from '../../i18n/LanguageProvider.jsx'


function LandingPage() {
  const { t } = useLanguage();
  return (
    <div className='flex flex-wrap lg:flex-nowrap justify-center lg:justify-between w-full min-h-[550px] lg:max-h-[600px]  items-center px-2 md:px-7 gap-10 '>

        <div className="flex flex-col order-2 lg:order-1 gap-4 lg:w-1/2">

        <h1 className='font-shangrilanf text-6xl md:text-7xl 2xl:text-9xl '>{t('landing_title')}</h1>
        <p className=' text-sm md:text-base lg:text-lg 2xl:text-xl font-karla'>{t('landing_desc').replace('MGNREGA', 'MGNREGA')}</p>
        
        <a href="" className='px-5 py-3 rounded-full bg-[#DD740B] hover:bg-[#f8ab5e] transition-all duration-500  flex items-center justify-center w-fit  text-white font-medium'>{t('landing_cta')}</a>

        </div>

        <img src={HeroImage} alt="Hero image" className='order-1 lg:order-2  lg:w-[46%] 2xl:max-w-[730px]' />
       
      
    </div>
  )
}

export default LandingPage
