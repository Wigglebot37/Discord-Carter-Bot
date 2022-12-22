const { Client, GatewayIntentBits, Partials, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, userMention } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildEmojisAndStickers],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.commands = new Collection();

const clientID='1054991224785870958';

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    
    client.login(process.env.token)
})();

// Emoji
const scrum='<:scrum:1027025996731396096>';
const waterfall='<:waterfall:1026187818407559239>';
const golf='<:carterpog:1042179553990291566>';
const agile='❤️';
const carter='<:carter:1026007558416252968>';

client.on(Events.MessageCreate, message => {
    if(message.content.toLowerCase().includes("scrum")) message.react(scrum);
    if(message.content.toLowerCase().includes("waterfall")) message.react(waterfall);
    if(message.content.toLowerCase().includes("golf")) message.react(golf);
    if(message.content.toLowerCase().includes("agile")) message.react(agile);
    if(message.content.toLowerCase().includes("carter")) message.react(carter);

    if(message.content.includes(`${message.guild.members.cache.get(clientID)}`)) {
        message.reply("Why are you pinging me, did you not read the syllabus?");
    }
})

client.on(Events.GuildMemberAdd, member => {
    // Welcoming New Members
    const channelID='1009915072002392164';
    const channel=member.guild.channels.cache.get(channelID);
    const message=`Welcome ${member} to the server! 🥳`;

    channel.send(message);

    // Updating Member Count
    const voiceChannel=member.guild.channels.cache.get('1054998466461450240');
    voiceChannel.setName(`Member Count: ${member.guild.memberCount.toLocaleString()}`);
})

client.on(Events.GuildMemberRemove, member => {
    // Updating Member Count
    const voiceChannel=member.guild.channels.cache.get('1054998466461450240');
    voiceChannel.setName(`Member Count: ${member.guild.memberCount.toLocaleString()}`);
});