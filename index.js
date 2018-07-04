require('dotenv').config()

const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', function() {
  bot.user.setActivity('ignorer les conversations').catch(console.error)
  console.log('Bot connecté.')
})

bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) {
    console.log('erreur')
    console.log(channel)
    return
  }
  // Send the message, mentioning the member
  channel.send(`Eh salut ${member}, comment tu vas ?`);
});

bot.on('guildMemberAvailable', member => {
  if (Math.random() * 100 > 90) {
    const channel = member.guild.channels.find('name', 'general');
    channel.send('Eh salut')
  }

})

bot.on('message', function (msg) {
  if (msg.content === '!ping') {
    msg.channel.send('pong!')
  }
})

bot.login(process.env.APP_TOKEN)
