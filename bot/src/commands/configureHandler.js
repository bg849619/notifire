import { client } from '../utilities/client.js';
import { SetServerJoinChannel, SetServerLeaveChannel, GetServerJoinChannel, GetServerLeaveChannel } from '../database/server.js';
import { Events, ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType, ComponentType } from 'discord.js';

client.on(Events.InteractionCreate, async (interaction) => {
    console.log("Handling interaction.");
    if(!interaction.isCommand())
        return;
    if(interaction.commandName === 'configure') {
        // Handle the configure command.
        // Fetch existing channels.
        const joinChannel = await GetServerJoinChannel(interaction.guildId);
        const leaveChannel = await GetServerLeaveChannel(interaction.guildId);

        const joinInput = new ChannelSelectMenuBuilder()
            .setCustomId('joinChannel')
            .setPlaceholder('Join Channel')
            .setMinValues(0)
            .setMaxValues(1)
            .setDefaultChannels(joinChannel ? [joinChannel] : []);
        
        const leaveInput = new ChannelSelectMenuBuilder()
            .setCustomId('leaveChannel')
            .setPlaceholder('Leave Channel')
            .setMaxValues(1)
            .setMinValues(0)
            .setDefaultChannels(leaveChannel ? [leaveChannel] : []);

        const joinRow = new ActionRowBuilder().addComponents(joinInput);
        const leaveRow = new ActionRowBuilder().addComponents(leaveInput);

        const response = await interaction.reply({
            content: 'Please select the join and leave channels.\n*You can dismiss this message at any time.*',
            components: [joinRow, leaveRow],
            ephemeral: true,
        });

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.ChannelSelect, time: 120_000 });
        collector.on('collect', async (i) => {
            console.log(`Collected ${i.customId} of ${i.values[0]}`);
            const action = i.customId;
            const channel = i.values[0];
            if(action === 'joinChannel')
                await SetServerJoinChannel(i.guildId, channel);
            else if(action === 'leaveChannel')
                await SetServerLeaveChannel(i.guildId, channel);
            i.reply({content: `${action} set.`, ephemeral: true});
        });
    }
});