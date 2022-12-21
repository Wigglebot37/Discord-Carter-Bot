const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports={
    data: new SlashCommandBuilder()
    .setName('agilemanifesto')
    .setDescription('Gain Wisdom.'),
    async execute(interaction,client) {
        await interaction.reply({ 
            content: '__**The Great Agile Manifesto**__\nIndividuals and Interactions over Processes and Tools.'
            +'\nWorking Product over Comprehensive Documentation.'
            +'\nCustomer Collaboration over Contract Negotiation.'
            +'\nResponding to Change over Following a Plan.'
        });
    }
}