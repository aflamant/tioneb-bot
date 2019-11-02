const commando = require('discord.js-commando')

class SayCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'say',
      group: 'simple',
      memberName: 'say',
      description: 'Faire dire un truc au bot.'
    });
  }

  async run(message, args) {
    let sayMessage = args;

    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
    console.log("Envoi du message '" + sayMessage + `' sur le channel ${message.channel.name} à la demande de ${message.author.username}`);
  }
}

module.exports = SayCommand;