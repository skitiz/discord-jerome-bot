// TODO:
//  Make the bot server only.
//  Timer on how many messages it takes.
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
    if(command === 'ban') {
        if(msg.mentions.users.first()){
            let user = msg.mentions.members.first();
            user.kick();
        }
    }
    if(command === 'test'){
        //Check if the channel exists.
        msg.member.voiceChannel.join().
        then(connection => {
            console.log('Connected!')
            const dispatcher = connection.playFile('./audio.mp3');
            dispatcher.on("end", end => {
                msg.member.voiceChannel.leave();
            });
        }).catch(err => console.log(err));
    }
    else {
        msg.reply('Join a voice channel first.');
    }
});