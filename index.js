const config = require("./config.json");

const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
  bot.user.setActivity(config.activity).catch(console.error);
  console.log('Bot connecté.');
})

bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) {
    console.log('erreur');
    console.log(channel);
    return;
  }
  // Send the message, mentioning the member
  channel.send(`Eh salut ${member}, comment tu vas ?`);
});

bot.on('guildMemberAvailable', member => {

  if (Math.random() * 100 > 90) {
    const channel = member.guild.channels.find('name', 'general');
    channel.send('Eh salut');
  }

})

bot.on('message', async message => {

  if (message.author.bot) return;

  // TODO: Ajouter réponse aux messages directs

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if (command === 'ping') {
    msg.channel.send('pong!');
  }

  if (command === 'say') {
    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);

  }
})

bot.login(config.token)
