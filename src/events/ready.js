const { WelcomeChannel } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Bot Online!');
        const activities=[
            'you for fools',
            'Agile Manifesto',
            'Scrum Meeting',
            'Royce Waterfall',
            'Eclipse',
            'Golf',
            '4 layered technology',
            'Sofware Engineering',
            'not IntelliJ',
            'Solitaire'
        ];
        client.user.setPresence({ activities: [{ name: `Golf`}]});

        setInterval(() => {
            const status=activities[Math.floor(Math.random()*activities.length)];
            client.user.setPresence({ activities: [{ name: `${status}`}]});
        }, 600000);
    },
};