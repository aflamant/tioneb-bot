const playFile = require('./play.js');
const { Command } = require('discord.js-commando');
const { music_channel } = require('../../config.json');

class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      memberName: 'pause',
      group: 'music',
      description: 'Met en pause la musique',
      guildOnly: true
    });
  }

  run(message) {
    const dispatcher = playFile.dispatcher;

    if (typeof dispatcher == 'undefined') {
      return message.reply('Il y a pas de musique en cours !');
    }

    dispatcher.pause();
  }
};

module.exports = PauseCommand;