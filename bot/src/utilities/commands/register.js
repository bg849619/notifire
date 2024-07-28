import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

let erred = false;
if(!process.env.DISCORD_TOKEN) {
    console.error('Token should be provided via env DISCORD_TOKEN');
    erred = true;
}
if(!process.env.DISCORD_CLIENT_ID) {
    console.error('Client ID should be provided via env DISCORD_CLIENT_ID');
    erred = true;
}

if(erred)
    process.exit(1);

const commands = [
    {
        name: 'configure',
        description: 'Configure the bot settings.',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
    console.log("Refreshing application commands.");

    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {body: commands});

    console.log("Successfully refreshed application commands.");
} catch(error) {
    console.error(error);
}