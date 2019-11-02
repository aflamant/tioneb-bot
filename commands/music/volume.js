const { Command } = require('discord.js-commando');
const playFile = require('./play.js');

class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'volume',
      aliases: ['change-volume'],
      group: 'music',
      memberName: 'volume',
      guildOnly: true,
      description: 'Changer le volume, de 1 à 200',
      args: [
        {
          key: 'wantedVolume',
          prompt: 'Quel niveau tu veux ? (de 1 à 200)',
          type: 'integer',
          validate: wantedVolume => wantedVolume >= 1 && wantedVolume <= 200
        }
      ]
    });
  }

  run(message, { wantedVolume }) {
    const dispatcher = playFile.dispatcher;

    if (typeof dispatcher == 'undefined') {
      return message.reply('Il y a pas de musique en cours !');
    }

    const volume = wantedVolume / 100;
    dispatcher.setVolume(volume);
  }
};

module.exports = VolumeCommand;