const commando = require('discord.js-commando')
const moment = require('moment-timezone');
const { timezones } = require('../../config.json');

class timezoneCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'heure',
      group: 'simple',
      memberName: '',
      aliases: ['timezone', 'fuseau'],
      description: 'Donne l\'heure chez les gens.'
    });
  }

  run(message, args) {
    moment.locale('fr-fr');
    for (const word of args.split(' ')) {
      for (const timezone in timezones) {
        if (timezones[timezone].indexOf(word) > -1) {
          let time = moment.tz(timezone).format('LT');
          let city = timezone.split('/')[1];
          return message.channel.send(`Il est ${time} à ${city}.`);
        }
      }
    }
    return message.channel.send('Je sais pas.')
  }
}

module.exports = timezoneCommand;