const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    if (args.length < 1) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\`\n\n ${module.exports.help.description}`)

    //message.channel.send('Em manutenção ...')/*

    await message.delete();

    let mentionedUser = message.mentions.users.first() || message.guild.members.cache.find(member => member.id == args[0] )
    console.log(mentionedUser.id)
 
    let msg     = args.join(' ');
        msg     = msg.replace('<@!' + mentionedUser.id + '>', '')
        msg     = msg.replace(mentionedUser.id, '')

      mentionedUser.send({ embed: {
        title: `${message.author.tag} - ${message.guild.name}`,
        description: `O usuário ${message.author.tag} de ${message.guild.name} lhe enviou a seguinte mensagem :`,
        fields: [{ 
          name: '**Mensagem** :',
          value: `\`\`\`${msg}\`\`\``
        }]
      }}).then(() => {
        message.channel.send('👌').then(msg => {
          setTimeout(() => {
            msg.delete()
          }, 3000)
        })
      });
  },
  conf: {},
  get help() {
    return {
      name: "saydm",
      category: "Public",
      description: "Mnda uma mensagem no dm de uma pessoa. Eh necessário a permissão de um staff. **MANUTENÇÃO**.",
      usage: "saydm [@user] [mensagem]"
    };
  }
};
