import React from 'react';

function Filters({ stateName, setStateName, districtName, setDistrictName, finYear, setFinYear, districts, finYears }) {
	return (
		<div className="flex items-center justify-center flex-wrap gap-4 pb-2">
			<div className="flex flex-col w-48">
				<label className="font-semibold pb-1 font-karla">State Name</label>
				<select className="rounded-md bg-[#FFF7E9] px-2 py-2 border-orange-900/55 border focus:outline-none" value={stateName} onChange={(e)=> setStateName(e.target.value)}>
					<option value="MAHARASHTRA">MAHARASHTRA</option>
				</select>
			</div>
			<div className="flex flex-col w-48">
				<label className="font-semibold pb-1 font-karla">District Name</label>
				<select className="rounded-md bg-[#FFF7E9] px-2 py-2 border-orange-900/55 border focus:outline-none" value={districtName} onChange={(e)=> setDistrictName(e.target.value)}>
					<option value="">SELECT DISTRICT</option>
					{districts.map(d => (
						<option key={d} value={d.toUpperCase()}>{d.toUpperCase()}</option>
					))}
				</select>
			</div>
			<div className="flex flex-col w-48">
				<label className="font-semibold pb-1 font-karla">Financial Year</label>
				<select className="rounded-md bg-[#FFF7E9] px-2 py-2 border-orange-900/55 border focus:outline-none" value={finYear} onChange={(e)=> setFinYear(e.target.value)}>
					{finYears.map(y => (
						<option key={y} value={y}>{y}</option>
					))}
				</select>
			</div>
		</div>
	);
}

export default Filters;


