export const MAHARASHTRA_DISTRICTS = [
	'Ahmednagar','Akola','Amravati','Aurangabad','Beed','Bhandara','Buldhana','Chandrapur','Dhule','Gadchiroli','Gondia','Hingoli','Jalgaon','Jalna','Kolhapur','Latur','Mumbai','Nagpur','Nanded','Nandurbar','Nashik','Osmanabad','Palghar','Parbhani','Pune','Raigad','Ratnagiri','Sangli','Satara','Sindhudurg','Solapur','Thane','Wardha','Washim','Yavatmal'
];

export const FIN_YEAR_OPTIONS = Array.from({ length: 7 }, (_, i) => {
	const start = 2018 + i;
	const end = start + 1;
	return `${start}-${end}`;
});

export const normalize = (s) => (s || '')
	.toLowerCase()
	.replace(/\b(district|city|suburban)\b/g, '')
	.replace(/[^a-z]/g, '')
	.trim();

export const findBestDistrictMatch = (detected) => {
	const n = normalize(detected);
	if (!n) return '';
	const exact = MAHARASHTRA_DISTRICTS.find(d => normalize(d) === n);
	if (exact) return exact;
	const starts = MAHARASHTRA_DISTRICTS.find(d => normalize(d).startsWith(n) || n.startsWith(normalize(d)));
	if (starts) return starts;
	const includes = MAHARASHTRA_DISTRICTS.find(d => normalize(d).includes(n) || n.includes(normalize(d)));
	return includes || '';
};


