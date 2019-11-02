const commando = require('discord.js-commando')
const request = require('request-promise');
const { OWM_API } = require('../../config.json')

class weatherCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'météo',
      group: 'timezone',
      memberName: 'météo',
      aliases: ['weather', 'meteo'],
      description: 'Donne la météo chez les gens.',
      args: [
        {
          key: 'location',
          prompt: 'Tu veux la météo de où ?',
          type: 'string',
          parse: location => location.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          validate: location => location.length > 0 && location.length < 200
        }
      ]
    });
  }

  async run(message, { location }) {
    try {
      let weather = await getWeather(location);
      message.channel.send('Météo à ' + location + ' : ' + weather.weather + ', avec une température de ' + weather.temperature + '°C.');
    } catch (error) {
      message.channel.send('J\'ai pas trouvé ta ville.');
    } 
  }
}

async function getWeather(location) {
  url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        location + '&appid=' + OWM_API + '&lang=fr&units=metric';
  options = {
    method: 'GET',
    uri: url
  };
  let response = await request(options);
  return {'weather': JSON.parse(response).weather[0].description, 'temperature': JSON.parse(response).main.temp};
}

module.exports = weatherCommand;