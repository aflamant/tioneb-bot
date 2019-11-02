const commando = require('discord.js-commando')
const config = require('../../config.json')

class RebootCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'reboot',
      group: 'admin',
      memberName: 'reboot',
      description: 'Reboot le bot.'
    });
  }

  hasPermission(message) {
    if (!this.client.isOwner(message.author)) return 'T\'as trop cru !';
    return true;
  }
  async run(message, args) {
    if (message.author.id == config.adminID) {
      console.log('Shutting down.');
      message.channel.send('oui maître').then(() => { process.exit() });
    } else {
      message.reply("t'as trop cru");
    }
  }
}

module.exports = RebootCommand;