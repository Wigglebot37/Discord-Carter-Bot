const { Client, GatewayIntentBits, Partials, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, userMention } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildEmojisAndStickers],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.commands = new Collection();

const clientID='1054991224785870958';
const wiggleID='392106677136261120';

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
const thumb='👍';
const punch='<:carterpunch:1096170355665674271>';
const welp='<:welp:1159353201485692950>';
const gang='<:gang:1152499087803940874>';
const shake='<:cartershake:1096170706716336278>';

client.on(Events.MessageCreate, message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().includes("scrum") 
        && !message.content.toLowerCase().includes(":scrum:")) message.react(scrum);
    if(message.content.toLowerCase().includes("waterfall") 
        && !message.content.toLowerCase().includes(":waterfall")) message.react(waterfall);
    if(message.content.toLowerCase().includes("golf")) message.react(golf);
    if(message.content.toLowerCase().includes("agile")) message.react(agile);
    if(message.content.toLowerCase().includes("carter") 
        && !message.content.toLowerCase().includes(":carter")) message.react(carter);
    if(message.content.toLowerCase().includes("punch") 
        && !message.content.toLowerCase().includes(":carterpunch")) message.react(punch);
    if(message.content.toLowerCase().includes("welp") 
        && !message.content.toLowerCase().includes(":welp")) message.react(welp);
    if(message.content.toLowerCase().includes("gang") 
        && !message.content.toLowerCase().includes(":gang")) message.react(gang);
    if(message.content.toLowerCase().includes("shake") 
        && !message.content.toLowerCase().includes(":cartershake")) message.react(shake);

    if(message.content.includes(`${message.guild.members.cache.get(clientID)}`)) {
        client.users.fetch(wiggleID).then((user)=> {
            user.send(message.url);
        })
        //message.reply("Why are you pinging me, did you not read the syllabus?");
    }

    introID='808569965548535830';
    botchanID='1062152605389815818';
    sendID='1025552870159945780';
    if(message.channelId===introID) {
        const role='1052826975657537578';
        const getRole=message.member.guild.roles.cache.get(role);

        message.member.roles.add(getRole);
    } else if(message.channelId===botchanID) {
        const channel=message.member.guild.channels.cache.get(sendID);
        message.react(thumb);

        if(message.content.toLowerCase().startsWith('/reply')) {
            end=message.content.indexOf(' ',8);
            mid=message.content.indexOf('/',1);
            chanid=message.content.substring(7,mid);
            pingchan=message.member.guild.channels.cache.get(chanid);
            pingmsg=message.content.substring(mid+1,end);
            newcontent=message.content.substring(end+1,message.content.length);
            pingchan.messages.fetch(pingmsg).then((msg)=> {
                msg.reply(newcontent);
            })
        } else if(message.content.toLowerCase().startsWith('/chan')) {
            end=message.content.indexOf(' ',7);
            chanid=message.content.substring(6,end);
            newchan=message.member.guild.channels.cache.get(chanid);
            newcontent=message.content.substring(end+1,message.content.length);
            newchan.send(newcontent);
        } else channel.send(message.content);
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