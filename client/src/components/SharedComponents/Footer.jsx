import React from 'react'
import { useLanguage } from '../../i18n/LanguageProvider.jsx'

function Footer() {
  const { t } = useLanguage();
  return (
    <div className='flex flex-col gap-2 items-center border-t border-[#5d7e5d] justify-center py-6 p-10'>
      
      <div className='flex gap-10 '>
     <a href="#" className=' font-karla text-lg font-medium'>{t('footer_home')}</a>
            <a href="https://nrega.dord.gov.in/" className=' font-karla text-lg font-medium'>{t('footer_about')}</a>
            {/* <a href="#" className='  font-karla text-lg font-medium' onClick={()=> setOpen(false)}>Contact</a> */}
       </div> 
        <p>{t('footer_copyright')}</p>

    </div>
  )
}

export default Footer
