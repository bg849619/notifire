import { createClient } from 'redis';

export const client = createClient();

client.on('error', (error) => {
    console.error(error);
});

export function start() {
    if(!process.env.REDIS_URL) {
        console.warn("No REDIS_URL environment variable found.");
        process.exit(1);
    }
    client.connect({
        url: process.env.REDIS_URL
    });
}