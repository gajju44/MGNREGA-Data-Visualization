import { useEffect, useState } from 'react';
import axios from 'axios';

export function useMGNREGAData(initialState = 'MAHARASHTRA') {
	const [stateName, setStateName] = useState(initialState);
	const [districtName, setDistrictName] = useState('');
	const [finYear, setFinYear] = useState('2024-2025');
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(20);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		if (!districtName) return;
		const fetchData = async () => {
			setLoading(true);
			try {
				const stateParam = (stateName || '').toUpperCase();
				const url = `http://localhost:5000/api/states/${encodeURIComponent(stateParam)}`;
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
			} catch (e) {
				console.error('MGNREGA fetch failed', e);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [stateName, districtName, finYear, currentPage, pageSize]);

	return {
		stateName, setStateName,
		districtName, setDistrictName,
		finYear, setFinYear,
		data, loading,
		currentPage, setCurrentPage,
		pageSize, setPageSize,
		hasMore
	};
}


