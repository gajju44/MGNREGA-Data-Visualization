import React, { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';
import axios from 'axios';
import { MAHARASHTRA_DISTRICTS, FIN_YEAR_OPTIONS, findBestDistrictMatch } from '../../constants/mgnrega';
import Filters from './Filters';
import DataTable from './DataTable';
import { useLanguage } from '../../i18n/LanguageProvider.jsx'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver.js'

function DistrictDashboard() {
  const { t } = useLanguage();
  const [stateName, setStateName] = useState('MAHARASHTRA');
  const [districtName, setDistrictName] = useState(''); 
  const [finYear, setFinYear] = useState(FIN_YEAR_OPTIONS[FIN_YEAR_OPTIONS.length - 1]);
  const [detectMessage, setDetectMessage] = useState(t('dd_detecting_location'));
  const [isDetecting, setIsDetecting] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(null);

 
  const [headerRef, headerIntersected] = useIntersectionObserver({ threshold: 0.2 });
  const [locationRef, locationIntersected] = useIntersectionObserver({ threshold: 0.2 });
  const [filtersRef, filtersIntersected] = useIntersectionObserver({ threshold: 0.1 });
  const [tableRef, tableIntersected] = useIntersectionObserver({ threshold: 0.1 });

  // Geolocation 
  const geo = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 8000,
    suppressLocationOnMount: false,
  });

 const reverseGeocode = async (lat, lon) => {
  const res = await axios.get(
    `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${import.meta.env.VITE_GEOCODE_API_KEY}`
  );
  return res.data.address;
};


  // Reverse geocode to district/state when we have coords
  useEffect(() => {
    const fetchAddress = async () => {
      if (!geo?.coords) return;
      try {
        setIsDetecting(true);
        setDetectMessage(t('dd_detecting_location'));
        const { latitude, longitude } = geo.coords;
        const addr = await reverseGeocode(latitude, longitude);
        const detectedState = addr.state || '';
        const detectedDistrict = addr.state_district || addr.district || addr.county || '';
        if (detectedState?.toLowerCase() === 'maharashtra') {
          setStateName('MAHARASHTRA');
          const matched = findBestDistrictMatch(detectedDistrict);
          setDistrictName(matched ? matched.toUpperCase() : '');
          setDetectMessage(matched ? t('dd_detected_maha_with', { district: matched }) : t('dd_detected_maha'));
        } else {
          setStateName('MAHARASHTRA');
          setDistrictName('');
          setDetectMessage(t('dd_outside_maha'));
        }
      } catch {
        setDetectMessage(t('dd_could_not_detect'));
      } finally {
        setIsDetecting(false);
      }
    };
    fetchAddress();
  }, [geo?.coords, t]);

  const handleRedetect = async () => {
    if (!geo?.coords) {
      setDetectMessage(t('dd_waiting_geo'));
      return;
    }
    try {
      setIsDetecting(true);
      setDetectMessage(t('dd_detecting_location'));
      const { latitude, longitude } = geo.coords;
      const addr = await reverseGeocode(latitude, longitude);
      const detectedState = addr.state || '';
      const detectedDistrict = addr.state_district || addr.district || addr.county || '';
      if (detectedState?.toLowerCase() === 'maharashtra') {
        setStateName('MAHARASHTRA');
        const matched = findBestDistrictMatch(detectedDistrict);
        setDistrictName(matched ? matched.toUpperCase() : '');
        setDetectMessage(matched ? t('dd_detected_maha_with', { district: matched }) : t('dd_detected_maha'));
      } else {
        setStateName('MAHARASHTRA');
        setDistrictName('');
        setDetectMessage(t('dd_outside_maha'));
      }
    } catch {
      setDetectMessage(t('dd_could_not_detect'));
    } finally {
      setIsDetecting(false);
    }
  };


  useEffect(() => {
    if (!districtName) return;
    const fetchMGNREGAData = async () => {
      setLoading(true);
      try {
        const stateParam = (stateName || '').toUpperCase();
        const url = `${import.meta.env.VITE_API_BASE}/api/states/${encodeURIComponent(stateParam)}`;
        const params = {
          'filters[district_name]': (districtName || '').toUpperCase(),
          'filters[fin_year]': finYear,
          
          offset: currentPage,
          limit: pageSize,
        };
        const res = await axios.get(url, { params });
        const records = res?.data?.data?.records || [];
        setData(records);
        setHasMore(records.length === pageSize);
        const cnt = res?.data?.data?.total ?? res?.data?.data?.totalrecords;
        const cntNum = Number(cnt);
        console.log('count', cntNum); 
        if (Number.isFinite(cntNum)) {
          setTotalCount(cntNum);
          const computedTotalPages = Math.max(1, Math.ceil(cntNum / pageSize));
          if (currentPage > computedTotalPages) {
            setCurrentPage(computedTotalPages);
          }
        }
      } catch (err) {
        console.error('Error fetching MGNREGA data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMGNREGAData();
  }, [districtName, finYear, stateName, currentPage, pageSize]);
  
  
  const totalPages = Number.isFinite(totalCount) ? Math.max(1, Math.ceil(totalCount / pageSize)) : (hasMore ? currentPage + 1 : currentPage);

  return (
    <div id="data" className="flex flex-col gap-10 py-10">
      <div ref={headerRef} className="flex flex-col gap-3 items-center">
        <h2 className={`font-shangrilanf text-4xl md:text-6xl lg:text-7xl lg:max-w-3xl text-center ${headerIntersected ? 'fade-in-up' : 'opacity-0'}`}>
          {t('dd_title')}
        </h2>
        <p className={`w-full max-w-6xl text-center text-sm md:text-base lg:text-lg font-karla ${headerIntersected ? 'fade-in-up delay-200' : 'opacity-0'}`}>
          {t('dd_desc')}
        </p>
        <div ref={locationRef} className={`mt-2 text-sm font-karla bg-[#FFF7E9] border border-orange-900/30 rounded-md px-3 py-2 flex items-center gap-3 ${locationIntersected ? 'fade-in-scale delay-300' : 'opacity-0'}`}>
          <span><span className="font-semibold">{t('dd_location_label')}</span> {detectMessage}</span>
          <button onClick={handleRedetect} disabled={isDetecting} className="px-3 py-1 rounded-md bg-[#DD740B] text-white hover:bg-[#f59b4a] disabled:opacity-60">{isDetecting ? t('dd_detecting') : t('dd_use_my_location')}</button>
        </div>
      </div>

      {/* Filters */}
      <div ref={filtersRef} className={filtersIntersected ? 'fade-in-up' : 'opacity-0'}>
        <Filters
          stateName={stateName}
          setStateName={setStateName}
          districtName={districtName}
          setDistrictName={setDistrictName}
          finYear={finYear}
          setFinYear={setFinYear}
          districts={MAHARASHTRA_DISTRICTS}
          finYears={FIN_YEAR_OPTIONS}
        />
      </div>
      

      {/* Data Section */}
      <div ref={tableRef} className={tableIntersected ? 'fade-in-up' : 'opacity-0'}>
        <DataTable
          data={data}
          loading={loading}
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          hasMore={hasMore}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default DistrictDashboard;
