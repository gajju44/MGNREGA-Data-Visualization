import React from 'react';

function DataTable({ data, loading, pageSize, setPageSize, currentPage, setCurrentPage, hasMore, totalPages }) {
	return (
		<>

		<div className="bg-green-50 rounded-xl p-6">
			<div className="flex flex-wrap gap-2 items-center justify-between pb-4 text-gray-700 font-karla">
				<div className="font-bold">District Data ({data.length} Records)</div>
				<div className="flex items-center gap-4">
					
					<div className="flex items-start justify-center gap-2 ">
						<button className="px-3 py-1 rounded border border-green-300 text-green-800 disabled:opacity-50" disabled={currentPage===1} onClick={()=> setCurrentPage(p=> Math.max(1, p-1))}>Prev</button>
					<button className="px-3 py-1 rounded border border-green-300 text-green-800 disabled:opacity-50" disabled={totalPages ? currentPage>=totalPages : !hasMore} onClick={()=> setCurrentPage(p=> p+1)}>Next</button>
					</div>
					<span className="text-sm">Rows per page</span>
					<select className="rounded-md bg-white px-2 py-1 border border-green-300" value={pageSize} onChange={(e)=>{ setPageSize(parseInt(e.target.value,10) || 20); setCurrentPage(1); }}>
						{[10,20,50,100].map(n => <option key={n} value={n}>{n}</option>)}
					</select>
				</div>
			</div>
			{loading ? (
				<div className="text-center text-lg font-semibold text-gray-600">Fetching MGNREGA Data...</div>
			) : data.length > 0 ? (
				<>
					<div className="w-full overflow-x-auto">
						<table className="min-w-max w-full text-left font-karla">
							<thead>
								<tr className="text-green-900">
									{Object.keys(data[0]).map((key) => (
										<th key={key} className="py-2 px-3 whitespace-nowrap text-xs sm:text-sm capitalize border-b border-green-200 bg-green-100 sticky top-0">
											{key.replace(/_/g, ' ')}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{data.map((row, i) => (
									<tr key={i} className="border-t border-green-200 text-green-900 font-medium">
										{Object.values(row).map((v, j) => (
											<td key={j} className="py-2 px-3 align-top text-xs sm:text-sm break-words max-w-[14rem] sm:max-w-none">
												{String(v)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
					
				</>
			) : (
				<div className="text-gray-600">No records found for this district and financial year.</div>
			)}
		</div>
		</>
	);
}

export default DataTable;


