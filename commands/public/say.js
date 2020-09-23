const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    if (args.length < 1) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)

    message.delete();

    let msg = args.join(' ')
  	message.channel.send(msg)
  },
  conf: {},
  get help() {
    return {
      name: "say",
      category: "Public",
      description: "Repete a mensagem q você digitou após o comando.",
      usage: "say [mensagem]"
    };
  }
};