const fs = require('fs');
const yt = require('ytdl-core');
const config = require('./config.json');

module.exports = {

  'ping' : (message) => {
    console.log(`Reception d'un ping de la part de ${message.author.username} sur le channel ${message.channel.name}`);
    message.channel.send('pong!');
  },

  'say' : (message, args) => {
    let sayMessage = args.join(" ");

    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
    console.log("Envoi du message '" + sayMessage + `' sur le channel ${message.channel.name} à la demande de ${message.author.username}`);
  },

  'code' : (message) => {
    message.delete().catch(O_o=>{});
    message.channel.send(':robot: bleep bloop, mon code est accessible en open-source : https://github.com/aflamant/tioneb-bot :robot:')
  },

  'join': (message) => {
		return new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel) return message.reply("connecte toi au vocal !");
			voiceChannel.join()
      .then(connection => {
        resolve(connection)
      })
      .catch(err => reject(err));
		});
	},

  'deco' : (message) => {
    return new Promise((resolve, reject) => {
      if (!message.guild.voiceConnection) {
        console.log("Deconnexion vocale impossible.");
        reject();
      }
      else {
        message.channel.send("ok je me casse");
        message.guild.voiceConnection.disconnect()
        resolve();
      }
    });
  },

  'play' : (message, args) => {
    if (!message.guild.voiceConnection) return module.exports.join(message).then(() => module.exports.play(message,args)).catch(console.log);
    try {

      let dispatcher = message.guild.voiceConnection.playStream(yt(args[0], { audioonly: true }), {passes : 2});
      dispatcher.setVolume(0.5);

      let collector = message.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith(config.prefix + 'stop')) {
					message.channel.send("ok j'arrête").then(() => {dispatcher.end();});
        }

			});

      dispatcher.on('end', () => {
				collector.stop();
			});

    } catch (e) {
      message.reply("j'ai pas trouvé ta vidéo");
      console.log(e);
    }
  },

  'help': (message) => {
    message.delete().catch(O_o=>{});
    let tosend = ['Voici les commandes auxquelles je sais répondre :','```xl', config.prefix + 'say : "Me faire dire un truc."', 'ATTENTION, LES COMMANDES SUIVANTES SONT EN BÊTA !!',  config.prefix + 'join : "Rejoindre le channel vocal de l\'utilisateur."',	config.prefix + 'play : "Jouer une musique à partir d\'un URL YouTube valide."',	config.prefix + 'stop : "Arrêter la lecture en cours."', config.prefix + 'deco : "Me déconnecter du channel."',	'```'];
    message.author.send(tosend.join('\n'));
  },

  'reboot': (message) => {
		if (message.author.id == config.adminID) {
      console.log('Shutting down.');
      message.reply('allez salut !');
      process.exit();
    } else {
      message.reply("t'as trop cru");
    }
	}
}
