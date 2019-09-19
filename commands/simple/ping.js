const commando = require('discord.js-commando')

class PingCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      group: 'simple',
      memberName: 'ping',
      description: 'Envoyer un ping au bot.'
    });
  }

  async run(message, args) {
    console.log(`Reception d'un ping de la part de ${message.author.username} sur le channel ${message.channel.name}`);
    message.channel.send('pong!');
  }
}

module.exports = PingCommand;