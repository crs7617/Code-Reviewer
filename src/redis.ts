    
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

export const connectRedis = async () => {
    await client.connect();
};

export const cacheResult = async (key: string, value: string) => {
    await client.set(key, value);
};

export const getCachedResult = async (key: string) => {
    const value = await client.get(key);
    return value;
};
