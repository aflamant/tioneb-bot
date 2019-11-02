const commando = require('discord.js-commando')

class CodeCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'code',
      group: 'simple',
      memberName: 'code',
      description: 'Afficher un lien vers le code du bot.'
    });
  }

  async run(message, args) {
    message.channel.send(':robot: bleep bloop, mon code est accessible en open-source : https://github.com/aflamant/tioneb-bot :robot:')
  }
}

module.exports = CodeCommand;