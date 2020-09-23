const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
  	const m = await message.channel.send("Ping?");
    m.edit(`Pong! \`${m.createdTimestamp - message.createdTimestamp}ms\`.`);
  },
  conf: {},
  get help() {
    return {
      name: "ping",
      category: "Public",
      description: "Ping.",
      usage: "ping"
    };
  }
};