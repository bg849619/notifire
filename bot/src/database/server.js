import { client } from './index.js';

export async function SetServerJoinChannel(server, channel) {
    if(channel)
        return await client.hSet('guild:' + server, 'joinChannel', channel);
    else
        return await client.hDel('guild:' + server, 'joinChannel');
}

export async function SetServerLeaveChannel(server, channel) {
    if(channel)
        return await client.hSet('guild:' + server, 'leaveChannel', channel);
    else
        return await client.hDel('guild:' + server, 'leaveChannel');
}

export async function GetServerJoinChannel(server) {
    return await client.hGet('guild:' + server, 'joinChannel');
}

export async function GetServerLeaveChannel(server) {
    return await client.hGet('guild:' + server, 'leaveChannel');
}