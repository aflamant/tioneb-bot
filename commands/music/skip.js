const commando = require('discord.js-commando');
const playFile = require('./play.js'); // importing the stuff I exported in play.js

module.exports = class SkipCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip-song', 'next', 'suivant'],
      memberName: 'skip',
      group: 'music',
      description: 'Passer la musique actuelle',
      guildOnly: true
    });
  }

  run(message) {
    if (typeof playFile.dispatcher == 'undefined') {
      return message.reply('Il y a rien qui passe maintenant !');
    }
    playFile.dispatcher.end();
  }
};