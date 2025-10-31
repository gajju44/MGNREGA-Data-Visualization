const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const { setCache } = require('../utils/cache.util');

async function connectMongo() {
	const uri = process.env.MONGODB_URI;
	if (!uri) {
		throw new Error('MONGODB_URI is not set');
	}
	await mongoose.connect(uri, {
		serverSelectionTimeoutMS: 15000
	});
}

async function fetchStateData(state, offset = 1, limit = 5000) {
	const apiUrl = `${process.env.API_BASE_URL}/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722`;
	const params = {
		format: 'json',
		'api-key': process.env.API_KEY,
		'filters[state_name]': state.toUpperCase(),
		'sort[state_name]': 'asc',
		offset,
		limit
	};
	const res = await axios.get(apiUrl, { params });
	return res.data;
}

async function seed() {
	if (!process.env.API_BASE_URL || !process.env.API_KEY) {
		throw new Error('API_BASE_URL or API_KEY is not set');
	}

	console.log('Connecting to MongoDB...');
	await connectMongo();
	console.log('Connected. Seeding cache...');

	
	const state = 'MAHARASHTRA';
	const offsets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const limit = 5000;
	try {
		const writtenKeys = [];
		let total = 0;
		for (const off of offsets) {
			try {
				console.log(`Fetching ${state} offset=${off} limit=${limit}...`);
				const data = await fetchStateData(state, off, limit);
				const recs = Array.isArray(data?.records) ? data.records : [];
				total += recs.length;
				console.log(`Fetched ${recs.length} records for offset=${off}`);
				// Persist per-offset to avoid oversized Mongo documents
				const partKey = `state_data_${state}_offset_${off}`;
				await setCache(partKey, { records: recs });
				writtenKeys.push(partKey);
			} catch (e) {
				console.warn(`Failed to fetch ${state} offset=${off}: ${e.message}`);
			}
		}
		// Write an index document to reference per-offset chunks
		const indexKey = `state_data_${state}_index`;
		await setCache(indexKey, { parts: writtenKeys, totalRecords: total, state });
		console.log(`Seeded ${state} in ${writtenKeys.length} parts (total=${total}). Index key: ${indexKey}`);
	} catch (err) {
		console.error('Failed to seed MAHARASHTRA data:', err.message);
	}

	await mongoose.connection.close();
	console.log('Seeding complete.');
}

seed().catch(err => {
	console.error('Seeding failed:', err);
	process.exitCode = 1;
});


