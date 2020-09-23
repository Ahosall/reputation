const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    if (args.length < 1) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)
      
    let mentionedChannel = message.mentions.channels.first()
    
    let channelID = message.mentions.channels.first()
    let msg = args.join(' ');

    channelID.send(msg.replace('<#' + channelID + '>', ''));
  	message.delete();

  },
  conf: {},
  get help() {
    return {
      name: "sayc",
      category: "Public",
      description: "Manda a mensagem q você digitou para o canal mencionado.",
      usage: "sayc [#channel] [mensagem]"
    };
  }
};