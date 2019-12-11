// TODO:
//  Make the bot server only.
//  Timer on how many messages it takes.
//  Add role based permissions.
//  Host onto heroku.
//

const Discord = require('discord.js');

const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(auth.token);

client.on('message', async msg => {
    if(!msg.content.startsWith('?') || msg.author.bot) return;
    const args = msg.content.slice(1).split(' ');
    const command = args.shift().toLowerCase();
    if(command === 'kiss') {
        if(msg.mentions.users.first()){
            let user = msg.mentions.members.first();
            msg.member.voiceChannel.join().
        then(connection => {
            console.log('Connected!')
            const dispatcher = connection.playFile('./audio.mp3');
            dispatcher.on("end", end => {
                msg.member.voiceChannel.leave();
            });
        }).catch(err => console.log(err));
            user.kick();
        }
    }
});