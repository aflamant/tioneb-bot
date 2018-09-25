const config = require("./config.json");

const Discord = require('discord.js');
const moment = require('moment-timezone');
moment.locale('fr-fr');

const commands = require('./commands')
const bot = new Discord.Client();

bot.on('ready', () => {
  bot.user.setActivity(config.activity).catch(console.error);
  console.log('Bot connecté.');
})

bot.on('guildMemberAdd', member => {

  const channel = member.guild.channels.find('name', 'general');

  console.log(`Premiere connexion de ${member} au serveur, envoi du message de bienvenue.`);

  channel.send(`Eh salut ${member}, comment tu vas ? Bienvenue chez toi !`);

});

bot.on('message', message => {
  if (message.author.bot) return;
  if (message.isMentioned(bot.user)) {

    console.log('Bot mentionné.');

    if (message.content.toLowerCase().indexOf('play despacito')) {
      commands.play(message, ['https://www.youtube.com/watch?v=kJQP7kiw5Fk'])
      .then(message.channel.send('Now playing: Luis Fonsi - Despacito ft. Daddy Yankee\n ─────────⚪───── ◄◄⠀▶⠀►►⠀ 3:08 / 4:42 ⠀ ───○ 🔊 ᴴᴰ ⚙️')
      return;
    }

    if (message.content.indexOf('?') > -1) { message.channel.send('je sais pas'); }
    else { message.channel.send('non'); }

    return;
  }

  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (commands.hasOwnProperty(command)) commands[command](message,args);
})

bot.login(config.token)
