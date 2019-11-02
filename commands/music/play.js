const commando = require('discord.js-commando')
const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const config = require('../../config.json')
const youtube = new Youtube(config.YOUTUBE_API)

var queue = [];
var isPlaying;

module.exports = class PlayCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'play',
      aliases: ['add', 'joue'],
      group: 'music',
      memberName: 'play',
      guildOnly: true,
      description: 'Lire une musique ou l\'ajouter à la playlist',
      args: [
        {
          key: 'query',
          prompt: 'Quelle musique tu veux ?',
          type: 'string',
          validate: query => query.length > 0 && query.length < 200
        }
      ]
    });
  }

  async run(message, { query }) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('T\'es pas connecté gros');
    if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
      try {
        query = query
          .replace(/(>|<)/gi, '')
          .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        const id = query[2].split(/[^0-9a-z_\-]/i)[0];
        const video = await youtube.getVideoByID(id);
      

        if (video.raw.snippet.liveBroadcastContent === 'live')
          return message.channel.send('Je sais pas faire les live');
        
        const url = video.url;
        const title = video.title;
        let duration = formatDuration(video.duration);
        const song = {
          url,
          title,
          duration,
          voiceChannel
        };
        
        queue.push(song);

        if(!isPlaying || typeof isPlaying === 'undefined') {
          isPlaying = true;
          return playSong(queue, message);
        } else if (isPlaying == true) {
          return message.say(`${song.title} ajouté à la playlist`);
        }

      } catch(err) {
        console.log(err);
        return message.channel.send('Oups ça a pas marché');
      }
    } else {
      try {
        const videos = await youtube.search(query, 1);
        var video = await youtube.getVideoByID(videos[0].id);

        if (video.raw.snippet.liveBroadcastContent === 'live')
          return message.channel.send('Je sais pas faire les live');
        
        const url = video.url;
        const title = video.title;
        let duration = formatDuration(video.duration);
        const song = {
          url,
          title,
          duration,
          voiceChannel
        };
        
        queue.push(song);

        if(!isPlaying || typeof isPlaying === 'undefined') {
          isPlaying = true;
          return playSong(queue, message);
        } else if (isPlaying == true) {
          return message.say(`${song.title} ajouté à la playlist`);
        }
      } catch(err) {
        console.log(err);
        return message.channel.send('Oups ça a pas marché');
      }
    }
  }
}

function playSong(queue, message) {
  let voiceChannel;
  queue[0].voiceChannel
    .join()
    .then(connection => {
      const dispatcher = connection
        .play(
          ytdl(queue[0].url, {
            volume: 0.1,
            quality: 'highestaudio',
            highWaterMark: 1024 * 1024 * 10
          })
        )
        .on('start', () => {
          module.exports.dispatcher = dispatcher;
          module.exports.queue = queue;
          voiceChannel = queue[0].voiceChannel;
          return message.guild.channels.find(channel => channel.name === 'commandes').send(`:musical_note:   Now playing: ${queue[0].title} - ${queue[0].duration}`);
        })
        .on('finish', () => {
          console.log('Next song');
          queue.shift();
          if (queue.length >= 1) {
            return playSong(queue, message);
          } else {
            isPlaying = false;
            message.guild.channels.find(channel => channel.name === 'commandes').send(`:musical_note:   Fin de la playlist atteinte`);
            console.log('Reached the end of the playlist, leaving voice channel.');
            return voiceChannel.leave();
          }
        })
        .on('error', e => {
          message.guild.defaultChannel.send('Elle marche pas cette musique !');
          return console.log(e);
        });
    })
    .catch(err => {
      return console.log(err);
    });
}

function formatDuration(durationObj) {
  const duration = `${durationObj.hours ? durationObj.hours + ':' : ''}${
    durationObj.minutes ? durationObj.minutes : '00'
  }:${
    durationObj.seconds < 10
      ? '0' + durationObj.seconds
      : durationObj.seconds
      ? durationObj.seconds
      : '00'
  }`;
  return duration;
}