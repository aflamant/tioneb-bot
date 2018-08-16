const fs = require('fs')


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
        message.reply("j'arrive");
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
        message.reply("ok je me casse")
        message.guild.voiceConnection.disconnect()
        resolve();
      }
    });
  },

  'play' : (message, args) => {
    message.delete().catch(O_o=>{});
    if (!message.guild.voiceConnection) return commands.join(message).then(() => commands.play(message,args));
    let stream = fs.createReadStream('./test.mp3');
    message.guild.voiceConnection.playStream(stream);
  }
}
