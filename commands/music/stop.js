const commando = require('discord.js-commando')
const playFile = require('./play.js')

class StopCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'stop',
      group: 'music',
      memberName: 'stop',
      description: 'Arrêter la lecture de la musique.'
    });
  }

  run(message) {
    var dispatcher = playFile.dispatcher;

    if (typeof dispatcher == 'undefined') {
      return message.reply('Il y a pas de musique en cours !');
    }

    dispatcher.end();
    playFile.queue.length = 0;
    return;
  }
}

module.exports = StopCommand;