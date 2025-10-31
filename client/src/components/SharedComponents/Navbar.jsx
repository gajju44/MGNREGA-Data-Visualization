import React, { useState } from 'react'
import { Globe, Menu, X } from 'lucide-react'
import Logo from '../../assets/Logo.svg'
import LogoBlack from '../../assets/LogoBlack.svg'
import MenuBG from '../../assets/MenuBG.svg'
import { useLanguage } from '../../i18n/LanguageProvider.jsx'

function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [langOpenMobile, setLangOpenMobile] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className='flex justify-between bg-[#32522D] p-3 sticky top-5 z-50  w-full px-5 rounded-lg bg items-center'>
        <img src={Logo} alt="Indian Government Logo" />
        {/* Desktop nav */}
        <div className='hidden md:flex items-center gap-6'>
          <a href="/" className='text-orange-500 font-karla text-lg font-medium '>{t('nav_home')}</a>
          <a href="https://nrega.dord.gov.in/" className='text-orange-500 font-karla text-lg font-medium '>{t('nav_about')}</a>
          {/* <a href="#" className='text-orange-500 font-karla text-lg font-medium '>Contact</a> */}
          <div className='relative'>
            <button aria-label="Language selection" onClick={() => setLangOpen(v=>!v)} className='px-4 py-1 text-black flex font-karla text-lg items-center justify-center gap-2 font-medium bg-orange-500 rounded-full'>
              <Globe size={18}/>{language==='mr' ? t('nav_language_mr') : t('nav_language_en')}
            </button>
            {langOpen && (
              <div className='absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-50'>
                <button className='w-full text-left px-3 py-2 hover:bg-orange-50 font-karla' onClick={() => { setLanguage('en'); setLangOpen(false); }}>{t('nav_language_en')}</button>
                <button className='w-full text-left px-3 py-2 hover:bg-orange-50 font-karla' onClick={() => { setLanguage('mr'); setLangOpen(false); }}>{t('nav_language_mr')}</button>
              </div>
            )}
          </div>
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
            <a href="/" className=' text-black font-karla text-lg font-medium' onClick={()=> setOpen(false)}>{t('nav_home')}</a>
            <a href="https://nrega.dord.gov.in/" className=' text-black font-karla text-lg font-medium' onClick={()=> setOpen(false)}>{t('nav_about')}</a>
            {/* <a href="#" className=' text-black font-karla text-lg font-medium' onClick={()=> setOpen(false)}>Contact</a> */}
            <div className='relative mt-2 w-full flex items-center justify-center'>
              <button aria-label="Language selection" className='px-4 py-2 text-black flex font-karla text-lg items-center justify-center gap-2 font-medium bg-orange-500 rounded-full' onClick={() => setLangOpenMobile(v=>!v)}>
                <Globe size={18}/>{language==='mr' ? t('nav_language_mr') : t('nav_language_en')}
              </button>
              {langOpenMobile && (
                <div className='absolute top-full mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-50'>
                  <button className='w-full text-left px-3 py-2 hover:bg-orange-50 font-karla' onClick={()=> { setLanguage('en'); setLangOpenMobile(false); setOpen(false); }}>{t('nav_language_en')}</button>
                  <button className='w-full text-left px-3 py-2 hover:bg-orange-50 font-karla' onClick={()=> { setLanguage('mr'); setLangOpenMobile(false); setOpen(false); }}>{t('nav_language_mr')}</button>
                </div>
              )}
            </div>
          </nav>
        </div>

    </div>
  )
}

export default Navbar
