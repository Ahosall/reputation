/**
 * O Comando Help envia uma mensagem de ajuda.
 * Cotendo comandos e outras informações.
 */

module.exports = {
  run: (client, message, args) => {
    /** Objeto embed que irá ser enviado. */
    let embedPublic = {
      color: 0x3EC708,
      title: 'Lista de Comandos (Publico)',
      description: 'Comandos disponivéis:',
      footer: {
        text: footerText
      },
      fields: []
    }

    let embedSysXP = {
      color: 0x00F4FF,
      title: 'Lista de Comandos (SysXP)',
      description: 'Comandos disponivéis:',
      footer: {
        text: footerText
      },
      fields: []
    }

    let embedModeration = {
      color: 0x006DFF,
      title: 'Lista de Comandos (Administradores)',
      description: 'Comandos disponivéis:',
      footer: {
        text: footerText
      },
      fields: []
    }

    /** Laço de repetição nos comandos publico
     * A cada comando é adicionado as informações em um object na array fields[]
     */
    client.commands.forEach(command => {
      if (command.alias) return
      if (command.help.category == "Public") {
        embedPublic.fields.push({
          name: `**${process.env.PREFIX}${command.help.name}**`,
          value: `**Descrição**: ${command.help.description}\n**Como Usar**: \`\`${process.env.PREFIX}${command.help.usage}\`\`\n**Categoria**: ${command.help.category}`
        })
      } else if(command.help.category == "SysXP") {
        embedSysXP.fields.push({
          name: `**${process.env.PREFIX}${command.help.name}**`,
          value: `**Descrição**: ${command.help.description}\n**Como Usar**: \`\`${process.env.PREFIX}${command.help.usage}\`\`\n**Categoria**: ${command.help.category}`
        })
      } else {
        embedModeration.fields.push({
          name: `**${process.env.PREFIX}${command.help.name}**`,
          value: `**Descrição**: ${command.help.description}\n**Como Usar**: \`\`${process.env.PREFIX}${command.help.usage}\`\`\n**Categoria**: ${command.help.category}`
        })
      }
    })

    /** Então envia a mensagem embed para o usuario. */
    message.author.send({ embed: embedPublic })
      .then(async msg => {
        message.react(':nhaa:714283616322191432')

        message.author.send({ embed: embedSysXP }).then(async msg => {
          if (message.member.hasPermission('ADMINISTRATOR')) {
            message.author.send({ embed: embedModeration }).then(async msg => {
              message.react(':antilolicon:714283324603891733')
            });
          }
        });        
      }).catch(() => message.reply('Desculpe, mas eu não tenho permissões para enviar mensagens por DM para você!'))
  },

  conf: {},

  help: {
    name: 'help',
    aliases: ['ajuda', 'commands', 'comandos'],
    category: 'Public',
    description: 'Mostra todos os comandos disponíveis do bot.',
    usage: 'help'
  }
}
