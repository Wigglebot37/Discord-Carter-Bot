const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require(`discord.js`);

module.exports = {
    data:new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a member of the discord.')
    .addUserOption(option => option.setName(`user`).setDescription(`The user you'd like to ban.`))
    .addStringOption(option => option.setName(`reason`).setDescription(`Reason for banning the user.`)),
    async execute(interaction, client) {

        const banUser=interaction.options.getUser('user');
        const banMember=await interaction.guild.members.fetch(banUser.id);
        const channel=interaction.channel;

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ 
            content: "You need banning privileges to use this command.", ephemeral: true
        });
        if(!banMember) return await interaction.reply({ content: 'That user is no longer in the server.', ephemeral: true });
        if(!banMember.bannable) return await interaction.reply({ content: 'User cannot be banned.', ephemeral: true });

        let reason=interaction.options.getString('reason');
        if(!reason) reason="Unspecified reason.";

        const dmEmbed=new EmbedBuilder()
        .setColor('#fff176')
        .setDescription(`You have been banned from ${interaction.guild.name} | ${reason}`);

        const embed=new EmbedBuilder()
        .setColor('#fff176')
        .setDescription(`${banUser.tag} has been banned. | ${reason}`);

        await banMember.send({
            embeds: [dmEmbed]
        }).catch(err => {
            return;
        });

        await banMember.ban({
            reason: reason
        }).catch(err => {
            interaction.reply({
                content: "There was an error.", ephemeral: true
            });
        });

        await interaction.reply({ embeds: [embed] });
    }
}