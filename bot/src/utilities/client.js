import { Client, GatewayIntentBits } from 'discord.js';
export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

export function start() {
    if(!process.env.DISCORD_TOKEN) {
        console.error('Token should be provided via env DISCORD_TOKEN');
        process.exit(1);
    }

    client.login(process.env.DISCORD_TOKEN);
}