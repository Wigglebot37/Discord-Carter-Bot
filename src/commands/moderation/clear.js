const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require(`discord.js`);

module.exports = {
    data:new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears a given amount of messages.')
    .addIntegerOption(option => option.setName(`amount`).setDescription(`How many messages you'd like to delete.`)
        .setMinValue(1).setMaxValue(100).setRequired(true)),
    async execute(interaction, client) {
        const amount=interaction.options.getInteger('amount');
        const channel=interaction.channel;

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ 
            content: "You need admin privileges to use this command.", ephemeral: true
        });
        if(!amount) return await interaction.reply({ content: "Specify how many you'd like to delete.", ephemeral: true});
        if(amount>100 || amount<1) return await interaction.reply({ content: "Select a value between 1 and 100 (inclusive).", ephemeral: true});

        await interaction.channel.bulkDelete(amount).catch(err=> {
            return;
        })

        const embed=new EmbedBuilder()
        .setColor('#fff176')
        .setDescription(`${amount} messages deleted.`)

        await interaction.reply({ embeds: [embed] }).catch(err=> {
            return;
        })
    }
}