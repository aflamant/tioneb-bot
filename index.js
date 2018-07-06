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

  console.log(`Premiere connexion de ${member} au serveur, envoi du message de bienvenue.`);

  channel.send(`Eh salut ${member}, comment tu vas ? Bienvenue chez toi !`);

});

bot.on('message', message => {

  if (message.author.bot) return;

  if (message.isMentioned(bot.user)) {

    console.log('Bot mentionné.');

    let words = message.content.toLowerCase().split(/[\s,.';]+/);

    if(words.indexOf("heure") > -1 && (words.indexOf("canada") > -1 || words.indexOf("bruno") > -1 || words.indexOf("montreal") > -1) ) {

      console.log("Requête de l\'heure à Montreal")

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
    console.log(`Reception d'un ping de la part de ${message.author.username} sur le channel ${message.channel.name}`);

    message.channel.send('pong!');
  }

  if (command === 'say') {
    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
    console.log("Envoi du message '" + sayMessage + `' sur le channel ${message.channel.name} à la demande de ${message.author.username}`);
  }

  if (command === 'code') {

    message.channel.send(':robot: bleep bloop, mon code est accessible en open-source : https://github.com/aflamant/tioneb-bot :robot:')
  }
})

bot.login(config.token)
