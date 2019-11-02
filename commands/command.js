const commando = require('discord.js-commando')

class aCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: '',
      group: 'simple',
      memberName: '',
      description: ''
    });
  }

  async run(message, args) {

  }
}

// module.exports = aCommand;