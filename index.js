const config = require("./config.json");

const Discord = require('discord.js');
const moment = require('moment-timezone');

const bot = new Discord.Client();
moment.locale('fr-fr');

bot.on('ready', () => {
  bot.user.setActivity(config.activity).catch(console.error);
  console.log('Bot connecté.');
})

bot.on('guildMemberAdd', member => {

  const channel = member.guild.channels.find('name', 'general');

  if (!channel) {
    return;
  }

  channel.send(`Eh salut ${member}, comment tu vas ? Bienvenue chez toi !`);
});

bot.on('guildMemberAvailable', member => {

  if (Math.random() * 100 > 90) {
    const channel = member.guild.channels.find('name', 'general');
    channel.send('Eh salut');
  }

})

bot.on('message', message => {

  if (message.author.bot) return;

  if (message.isMentioned(bot.user)) {

    let words = message.content.toLowerCase().split(" ");

    if(words.indexOf("heure") > -1 && (words.indexOf("canada") > -1 || words.indexOf("bruno") > -1 || words.indexOf("montreal") > -1) ) {

      let timeInMontreal = moment().tz('America/Montreal').format('LT');
      message.channel.send('là il est ' + timeInMontreal + ' chez bruno')

    }

    else if (words.indexOf('?') > -1) {
      message.channel.send('je sais pas');
    }
    else {
      message.channel.send('ok');
    }
    return;

  }

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if (command === 'ping') {
    message.channel.send('pong!');
  }

  if (command === 'say') {
    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

  if (command === 'code') {
    message.channel.send(':robot: bleep bloop, mon code est accessible en open-source : https://github.com/aflamant/tioneb-bot :robot:')
  }
})

bot.login(config.token)
