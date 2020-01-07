// TODO:
//  Make the bot server only.
//  Timer on how many messages it takes.
//  Add role based permissions.
//  Host onto heroku.
//

const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    var date = new Date();
    client.setInterval(function(){
        let birthdays = new Map();
        birthdays.set('12-28', 'Will');
        birthdays.set('1-1', 'Jake');
        birthdays.set('8-21', 'George');
        birthdays.set('1-4', 'Aku');
        if(birthdays.has(String((date.getMonth() + 1 )+ '-' + date.getDate()))){
            console.log("'" + (date.getMonth() + 1) + '-' + date.getDate() + "'");
            client.channels.get('653784594654691348').send("Happy birthday " + birthdays.get(String((date.getMonth() + 1) + '-' + date.getDate())) + "!");
        }
    }, 86400);
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
            const stream = ytdl('https://www.youtube.com/watch?v=PFZrO6UDjP8', { filter : 'audioonly' });
            const dispatcher = connection.playStream(stream, streamOptions);
            dispatcher.on("end", end => {
                msg.member.voiceChannel.leave();
            });
        }).catch(err => console.log(err));
            user.kick();
        }
    }
    if(command === 'help') {
            msg.channel.send("Hello, to issue commands to me, please preface your commands with `?`. You can try: ?kiss, ?start, ?shoot (row, column), ?" +
            "\n I can kiss members or play battleship" +
            "with you.");
    }
    if(command === 'start') {
            msg.channel.send("Hello, lets play a game of battleship. Lets start by placing your ships. \nWhat would you like to place first?" +
    "A. 4 tile ship B. 4 tile ship. 3 tile ship.");
    }
});



