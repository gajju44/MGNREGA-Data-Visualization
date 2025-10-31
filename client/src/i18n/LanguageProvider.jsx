import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

const TRANSLATIONS = {
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_language_en: 'English',
    nav_language_mr: 'मराठी',

    landing_title: 'Your Rights. Our Work. Your Data.',
    landing_desc:
      'Learn about the work happening in your community and understand your rights under the MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act, 2005)',
    landing_cta: 'Explore the Data',

    dd_title: 'Discover How Your District is Growing with MGNREGA',
    dd_desc:
      'Get real-time insights into how MGNREGA is transforming your district. View transparent data on jobs created, funds utilized, and assets built, empowering citizens with clear and open access to rural development information.',
    dd_location_label: 'Location:',
    dd_detecting: 'Detecting…',
    dd_use_my_location: 'Use my location',
    dd_detecting_location: 'Detecting location…',
    dd_detected_maha: 'Detected Maharashtra',
    dd_detected_maha_with: 'Detected Maharashtra • District: {{district}}',
    dd_outside_maha: 'Outside Maharashtra — defaulting to Maharashtra',
    dd_could_not_detect: 'Could not detect location',
    dd_waiting_geo: 'Waiting for geolocation permission…',

    filters_state_name: 'State Name',
    filters_district_name: 'District Name',
    filters_select_district: 'SELECT DISTRICT',
    filters_financial_year: 'Financial Year',

    table_title: 'District Data ({{count}} Records)',
    table_prev: 'Prev',
    table_next: 'Next',
    table_rows_per_page: 'Rows per page',
    table_loading: 'Fetching MGNREGA Data...',
    table_empty: 'No records found for this district and financial year.',

    footer_home: 'Home',
    footer_about: 'About',
    footer_copyright: 'Copyright © 2025. All Rights Reserved',
  },
  mr: {
    nav_home: 'मुख्यपृष्ठ',
    nav_about: 'माहिती',
    nav_language_en: 'English',
    nav_language_mr: 'मराठी',

    landing_title: 'आपले हक्क. आमचे काम. आपला डेटा.',
    landing_desc:
      'आपल्या परिसरात सुरू असलेल्या कामाबद्दल जाणून घ्या आणि मनरेगा (महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी अधिनियम, 2005) अंतर्गत आपले हक्क समजा',
    landing_cta: 'डेटा पाहा',

    dd_title: 'मनरेगासह आपल्या जिल्ह्याचा विकास जाणून घ्या',
    dd_desc:
      'मनरेगा तुमच्या जिल्ह्याला कसा बदलत आहे याबद्दल रिअल-टाइम माहिती मिळवा. नोकऱ्या, निधीचा वापर आणि निर्माण झालेली साधने यावर पारदर्शक डेटा पहा—ग्रामीण विकासाची माहिती स्पष्ट आणि खुल्या स्वरूपात नागरिकांपर्यंत पोहोचवण्यासाठी.',
    dd_location_label: 'स्थान:',
    dd_detecting: 'ओळख चालू…',
    dd_use_my_location: 'माझे स्थान वापरा',
    dd_detecting_location: 'स्थान ओळखत आहोत…',
    dd_detected_maha: 'महाराष्ट्र ओळखले',
    dd_detected_maha_with: 'महाराष्ट्र ओळखले • जिल्हा: {{district}}',
    dd_outside_maha: 'महाराष्ट्राबाहेर — महाराष्ट्र निवडले',
    dd_could_not_detect: 'स्थान ओळखता आले नाही',
    dd_waiting_geo: 'स्थान परवानगीची वाट पाहत आहोत…',

    filters_state_name: 'राज्याचे नाव',
    filters_district_name: 'जिल्ह्याचे नाव',
    filters_select_district: 'जिल्हा निवडा',
    filters_financial_year: 'आर्थिक वर्ष',

    table_title: 'जिल्ह्याचा डेटा ({{count}} नोंदी)',
    table_prev: 'मागील',
    table_next: 'पुढील',
    table_rows_per_page: 'प्रति पृष्ठ ओळी',
    table_loading: 'मनरेगा डेटा आणत आहोत...',
    table_empty: 'या जिल्हा आणि आर्थिक वर्षासाठी कोणतीही नोंद आढळली नाही.',

    footer_home: 'मुख्यपृष्ठ',
    footer_about: 'माहिती',
    footer_copyright: 'प्रताधिकार © 2025. सर्व हक्क राखीव',
  },
};

function interpolate(template, params) {
  if (!params) return template;
  return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    const k = String(key).trim();
    return Object.prototype.hasOwnProperty.call(params, k) ? String(params[k]) : '';
  });
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'mr') {
      setLanguage(saved);
    }
  }, []);

  const setLang = (lang) => {
    setLanguage(lang);
    try { localStorage.setItem('language', lang); } catch {}
  };

  const t = useMemo(() => {
    return (key, params) => {
      const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
      const raw = dict[key] || key;
      return typeof raw === 'string' ? interpolate(raw, params) : raw;
    };
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage: setLang, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}


