const { Command } = require('discord.js-commando');
const playFile = require('./play.js');

class EarrapeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'earrape',
      group: 'music',
      memberName: 'earrape',
      guildOnly: true,
      description: 'VOLUME TO THE MAX',
      hidden: true,
      throttling: {
        usages: 1,
        duration: 120
      },
    });
  }

  run(message) {
    const dispatcher = playFile.dispatcher;

    if (typeof dispatcher == 'undefined') {
      return message.reply('Il y a pas de musique en cours !');
    }

    dispatcher.setVolume(20);
  }
};

module.exports = EarrapeCommand;