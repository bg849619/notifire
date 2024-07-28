import { createClient } from 'redis';

export const client = createClient();

client.on('error', (error) => {
    console.error(error);
});

export function start() {
    client.connect(process.env.REDIS_URL || 'redis://localhost:6379');
}