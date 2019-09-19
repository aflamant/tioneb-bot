const commando = require('discord.js-commando')
const config = require('../../config.json')

class HelpCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'help',
      group: 'simple',
      memberName: 'help',
      description: 'Affiche l\'aide des commandes disponibles.'
    });
  }

  async run(message, args) {
    message.delete().catch(O_o=>{});
    let tosend = ['Voici les commandes auxquelles je sais répondre :','```xl', config.prefix + 'say : "Me faire dire un truc."', 'ATTENTION, LES COMMANDES SUIVANTES SONT EN BÊTA !!',  config.prefix + 'join : "Rejoindre le channel vocal de l\'utilisateur."',	config.prefix + 'play : "Jouer une musique à partir d\'un URL YouTube valide."',	config.prefix + 'stop : "Arrêter la lecture en cours."', config.prefix + 'deco : "Me déconnecter du channel."',	'```'];
    message.author.send(tosend.join('\n'));
  }
}

module.exports = HelpCommand;