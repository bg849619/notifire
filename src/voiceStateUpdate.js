import {client} from './utilities/client.js';
import {GetServerJoinChannel, GetServerLeaveChannel} from './database/server.js';

client.on('voiceStateUpdate', async (oldState, newState) => {
    console.log("Voice state update received.");
    try {
        if(!oldState.channel && newState.channel) {
            // User joined a channel.
            const joinChannel = await GetServerJoinChannel(newState.guild.id);
            if(joinChannel) {
                const channel = newState.guild.channels.cache.get(joinChannel);
                if(channel) {
                    channel.send(`${newState.member.displayName} joined ${newState.channel}.`);
                }
            }
        }
        else if(oldState.channel && !newState.channel) {
            // User left a channel.
            const leaveChannel = await GetServerLeaveChannel(newState.guild.id);
            if(leaveChannel) {
                const channel = newState.guild.channels.cache.get(leaveChannel);
                if(channel) {
                    channel.send(`${newState.member.displayName} left ${oldState.channel}.`);
                }
            }
        }
    } catch(err) {
        console.error(err);
    }
});