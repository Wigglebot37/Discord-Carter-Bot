const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports={
    data: new SlashCommandBuilder()
    .setName('4layer')
    .setDescription('Gain Wisdom.'),
    async execute(interaction,client) {
        await interaction.reply({ 
            content: '__**The 4-Layered Technology**__\nTools.'
            +'\nMethods.'
            +'\nProcess Models.'
            +'\nA Quality Focus.'
        });
    }
}