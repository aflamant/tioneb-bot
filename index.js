const config = require("./config.json");
const Commando = require('discord.js-commando');

// Setup du bot
const bot = new Commando.Client({
  owner: '172013237510864896'
});
bot.registry
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: true,
    prefix: true,
    ping:false,
    eval: true,
    unknownCommand: true,
    commandState: false
  })
  .registerGroup('simple', 'Simple')
  .registerGroup('admin', 'Administration')
  .registerGroup('music', 'Musique')
  .registerGroup('timezone', 'Timezone');
// bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');


var queue = [];
var isPlaying = false;

bot.on('ready', () => {
  bot.user.setActivity(config.activity).catch(console.error);
  console.log('Bot connecté.');
})

bot.login(config.token)
