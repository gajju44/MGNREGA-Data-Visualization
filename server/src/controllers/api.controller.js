const axios = require('axios');
const { getCache, setCache } = require('../utils/cache.util');
const Cache = require('../models/cache.model');

// Local fallback data for when API is down
const fallbackData = {
  records: [
  
    { state_name: "MAHARASHTRA", district_name: "MUMBAI", data_point: "Sample data" }
  ]
};


exports.getStateData = async (req, res) => {
  try {
    const { state } = req.params;
    const filters = req.query.filters || {};
    const offset = Number(req.query.offset) || 1;
    const limit = Number(req.query.limit) || 10;
    
    const cacheKey = `state_data_${state}_${JSON.stringify(filters)}_${offset}_${limit}`;
    
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.status(200).json({
        source: 'cache',
        data: cachedData
      });
    }
    
    const apiUrl = `${process.env.API_BASE_URL}/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722`;
    const params = {
      format: 'json',
      'api-key': process.env.API_KEY,
      'filters[state_name]': state.toUpperCase(),
      'sort[state_name]': 'asc',
      offset,
      limit
    };
    
    Object.keys(filters).forEach(key => {
      params[`filters[${key}]`] = filters[key];
    });
    
    const response = await axios.get(apiUrl, { params });
    const data = response.data;
    
    
    await setCache(cacheKey, data);
    
    return res.status(200).json({
      source: 'api',
      data
    });
    
  } catch (error) {
    console.error('API Error:', error.message);
    // Try serving from cached MongoDB data as fallback
    try {
      const { state } = req.params;
      const filters = req.query.filters || {};
      const offset = Number(req.query.offset) || 1;
      const limit = Number(req.query.limit) || 10;

      // First try exact cache hit for this page
      const pageCacheKey = `state_data_${state}_${JSON.stringify(filters)}_${offset}_${limit}`;
      const pageCached = await getCache(pageCacheKey);
      if (pageCached) {
        return res.status(200).json({ source: 'cache', data: pageCached, message: 'Served page from cache due to API unavailability' });
      }

      // Assemble from seeded parts
      const indexKey = `state_data_${state}_index`;
      const indexDoc = await getCache(indexKey);
      if (indexDoc && Array.isArray(indexDoc.parts) && indexDoc.parts.length) {
        let all = [];
        for (const partKey of indexDoc.parts) {
          const part = await getCache(partKey);
          if (part && Array.isArray(part.records)) {
            all = all.concat(part.records);
          }
        }
        // Apply filters
        const filtered = Object.keys(filters).length
          ? all.filter(rec => Object.entries(filters).every(([k, v]) => `${rec[k]}`.toUpperCase() === `${v}`.toUpperCase()))
          : all;
        // Paginate 
        const start = (offset - 1) * limit;
        const paged = filtered.slice(start, start + limit);
        const assembled = { records: paged, count: filtered.length, total: all.length };
        // Cache assembled page
        await setCache(pageCacheKey, assembled);
        return res.status(200).json({ source: 'seed-cache', data: assembled, message: 'Served from seeded cache due to API unavailability' });
      }
    } catch (e) {
      // ignore and fall through to static fallback
    }
    return res.status(200).json({
      source: 'fallback',
      data: fallbackData,
      message: 'Using fallback data due to API unavailability'
    });
  }
};


exports.getStates = async (req, res) => {
  try {
    const cacheKey = 'all_states';
    
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.status(200).json({
        source: 'cache',
        data: cachedData
      });
    }
    
    
    const apiUrl = `${process.env.API_BASE_URL}/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722`;
    const params = {
      format: 'json',
      'api-key': process.env.API_KEY,
      'group[state_name]': 'asc'
    };
    
    const response = await axios.get(apiUrl, { params });
    const data = response.data;
    
    // Cache the API response
    await setCache(cacheKey, data);
    
    return res.status(200).json({
      source: 'api',
      data
    });
    
  } catch (error) {
    console.error('API Error:', error.message);
    // Try serving from cached MongoDB data as fallback
    try {
      const cacheKey = 'all_states';
      const cached = await getCache(cacheKey);
      if (cached) {
        return res.status(200).json({
          source: 'cache',
          data: cached,
          message: 'Served from cache due to API unavailability'
        });
      }
    } catch (e) {
      // ignore and fall through to static fallback
    }
    return res.status(200).json({
      source: 'fallback',
      data: { states: ['MAHARASHTRA', 'DELHI', 'KARNATAKA'] },
      message: 'Using fallback data due to API unavailability'
    });
  }
};