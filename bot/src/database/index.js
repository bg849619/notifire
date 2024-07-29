import { createClient } from 'redis';

export const client = createClient();

client.on('error', (error) => {
    console.error(error);
});

export function start() {
    if(!process.env.REDIS_URL) {
        console.warn("No REDIS_URL environment variable found. Defaulting to redis://localhost:6379.");
    }
    client.connect(process.env.REDIS_URL || 'redis://localhost:6379');
}