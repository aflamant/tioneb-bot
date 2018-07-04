require('dotenv').config()

const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', function() {
  bot.user.setActivity('ignorer les conversations').catch(console.error)
})

bot.on('message', function (msg) {
  if (msg.content === '!ping') {
    msg.channel.send('pong!')
  }
})

bot.login(process.env.APP_TOKEN)
