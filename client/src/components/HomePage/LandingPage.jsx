import React from 'react'
import HeroImage from '../../assets/HeroImage.svg'
import { useLanguage } from '../../i18n/LanguageProvider.jsx'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver.js'


function LandingPage() {
  const { t } = useLanguage();
  
  const [titleRef, titleIntersected] = useIntersectionObserver({ threshold: 0.2 });
  const [descRef, descIntersected] = useIntersectionObserver({ threshold: 0.2 });
  const [ctaRef, ctaIntersected] = useIntersectionObserver({ threshold: 0.2 });
  const [imageRef, imageIntersected] = useIntersectionObserver({ threshold: 0.2 });
  
  return (
    <div className='flex flex-wrap lg:flex-nowrap justify-center lg:justify-between w-full min-h-[550px] lg:max-h-[600px]  items-center px-2 md:px-7 gap-10 '>

        <div className="flex flex-col order-2 lg:order-1 gap-4 lg:w-1/2">

        <h1 
          ref={titleRef}
          className={`font-shangrilanf text-6xl md:text-7xl 2xl:text-9xl ${titleIntersected ? 'fade-in-left' : 'opacity-0'}`}
        >
          {t('landing_title')}
        </h1>
        
        <p 
          ref={descRef}
          className={`text-sm md:text-base lg:text-lg 2xl:text-xl font-karla ${descIntersected ? 'fade-in-up delay-200' : 'opacity-0'}`}
        >
          {t('landing_desc').replace('MGNREGA', 'MGNREGA')}
        </p>
        
        <a 
          ref={ctaRef}
          href="#data" 
          className={`px-5 py-3 rounded-full bg-[#DD740B] hover:bg-[#f8ab5e] transition-all duration-500 flex items-center justify-center w-fit text-white font-medium ${ctaIntersected ? 'fade-in-up delay-300' : 'opacity-0'}`}
        >
          {t('landing_cta')}
        </a>

        </div>

        <img 
          ref={imageRef}
          src={HeroImage} 
          alt="Hero image" 
          className={`order-1 lg:order-2 lg:w-[46%] 2xl:max-w-[730px] ${imageIntersected ? 'fade-in-right' : 'opacity-0'}`}
        />
       
      
    </div>
  )
}

export default LandingPage
