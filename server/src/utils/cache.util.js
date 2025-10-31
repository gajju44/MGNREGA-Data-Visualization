const NodeCache = require('node-cache');
const Cache = require('../models/cache.model');

// In-memory cache
const memoryCache = new NodeCache({ 
  stdTTL: process.env.CACHE_TTL || 3600,
  checkperiod: 120
});


const getCache = async (key) => {
 
  // Check memory cache first
  const memData = memoryCache.get(key);
  if (memData) return memData;
  
  // Check MongoDB cache
  try {
    const dbCache = await Cache.findOne({ key });
    if (dbCache && new Date() < dbCache.expiresAt) {
      // Store in memory cache for faster access next time
      memoryCache.set(key, dbCache.data);
      return dbCache.data;
    }
  } catch (error) {
    console.error('Cache retrieval error:', error);
  }
  
  return null;
};


const setCache = async (key, data, ttl = process.env.CACHE_TTL || 3600) => {
  // Set in memory cache
  memoryCache.set(key, data, ttl);
  
  // Set in MongoDB cache
  try {
    const expiresAt = new Date(Date.now() + ttl * 1000);
    
    await Cache.findOneAndUpdate(
      { key },
      { key, data, expiresAt },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error('Cache storage error:', error);
  }
};

module.exports = {
  getCache,
  setCache
};