const playFile = require('./play.js');
const { Command } = require('discord.js-commando');

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reprendre',
      aliases: ['continue', 'unpause', 'reprend', 'resume'],
      memberName: 'reprendre',
      group: 'music',
      description: 'Reprendre la musique en cours',
      guildOnly: true
    });
  }

  run(message) {
    const dispatcher = playFile.dispatcher;

    if (typeof dispatcher == 'undefined') {
      return message.reply('Il y a pas de musique en cours !');
    }

    dispatcher.resume();
  }
};