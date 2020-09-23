/* Comando resposanvel pela configuração do bot
 *
 */
const Discord = require('discord.js')
const firebase = require('firebase')
const database = firebase.database();

module.exports = {
  run: async (client, message, [ option, value, value2 ]) => {
    /** Verifica se o membro possui permissão para administrar roles. */
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Você não pode fazer isto :^')

    if (!option) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)
      
    // Altera o prefixo
    if (option == 'prefix' || option == 'setPrefix' || option == 'prefixo') {
      let prefix = value;

      // Verfica se tem argumento
      //message.reply('Opção em MANUTENÇÃO ...')/*
      if (prefix != 'NO') {
        database.ref(`servers/${message.guild.id}/prefix/`)
        .update({
          custom: prefix
        }).then(async () => {
          await message.reply('O prefixo foi **alterado** e **armazenado**!');
        })
        // desativa o prefixo customizado
      } else if (prefix == 'NO' || prefix == 'None') {
        database.ref(`servers/${message.guild.id}/prefix/`)
        .update({
          custom: prefix
        }).then(async () => {
          await message.reply('O prefixo foi **desativado**!');
        })
      // Valor incorreto
      } else {
        let embedErrorPrefix = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag}`)
          .setDescription(`Já que você não informou um prefixo irei deixar como \`re.\` ...`)
          .setFooter(footerText)

        message.channel.send(embedErrorPrefix)
      }
    // SysXP*/
    } else if (option == 'sysXP' || option == 'SysXP') {
      let sysXP = value;

      // Ativa o sistema
      if (sysXP == 'active') {
        database.ref(`servers/${message.guild.id}/sysXP/`)
        .update({
          status: "ACTIVED"
        }).then(async () => {
          await message.reply('O sistema de xp foi **ativado** consulte o `config help sysXP` para mais informações!');
        })
      // Desativa o sistema
      } else if (sysXP == 'deactive') {
        database.ref(`servers/${message.guild.id}/sysXP/`)
        .update({
          status: "NO_ACTIVED"
        }).then(async () => {
          await message.reply('O sistema de xp foi **desativado** consulte o `config help sysXP para mais informações!');
        })
      // Desativa o xp em um canal.
      } else if (sysXP == 'No_XP_Channel') {
        let channel = message.mentions.channels.first() || message.channel

          if (value2 == 'yes') {
            database.ref(`servers/${message.guild.id}/sysXP/channels/${channel.id}`)
            .update({
                permition: 'DENIED'
            }).then(async () => {
              if (channel.id == message.channel.id) {
                await message.reply('O ganho de xp neste canal foi **desativado** consulte o `config help sysXP para mais informações!');
              } else {
                await message.reply(`O ganho de xp no canal <#${channel.id}> foi **desativado** consulte o \`config help sysXP\` para mais informações!`);
              }
            })
          } else if (value2 == 'no') {
            database.ref(`servers/${message.guild.id}/sysXP/channels/${channel.id}`)
            .update({
                permition: 'OK'
            }).then(async () => {
              if (channel.id == message.channel.id) {
                await message.reply('O ganho de xp neste canal foi **ativado** consulte o `config help sysXP` para mais informações!');
              } else {
                await message.reply(`O ganho de xp no canal <#${channel.id}> foi **ativado** consulte o \`config help sysXP\` para mais informações!`);
              }
            })
          } else if (value2 == 'help') {
            let embedHelpNoXPC = new Discord.MessageEmbed()
              .setTitle(`${message.author.tag}`)
              .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
              .setDescription(`Aqui todas as informações do No_XP_Channel :`)
              .addField('**yes**', 'responsavél por **desativar** o ganho de xp em um certo canal.')
              .addField('**no**', 'responsavél por **desativar** o ganho de xp em um certo canal.')
              .addField('**help**', 'responsavél por **mostrar** todas as informações do No_XP_Channel.')
              .addField('**Como usar**', '`re.config sysXP No_XP_Channel [yes/no/help] [canal (Não é obrigatório)]`')
              .setFooter(footerText)

            message.channel.send(embedHelpNoXPC)    
          } else {
            let embedErrorNoXPC = new Discord.MessageEmbed()
              .setTitle(`${message.author.tag}`)
              .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
              .setDescription(`Não conheço o valor \`${value2}\` ... que tal usar estes :`)
              .addField('**yes**', 'responsavél por **desativar** o ganho de xp em um certo canal.')
              .addField('**no**', 'responsavél por **desativar** o ganho de xp em um certo canal.')
              .addField('**help**', 'responsavél por **mostrar** todas as informações do No_XP_Channel.')
              .addField('**Como usar**', '`re.config sysXP No_XP_Channel [yes/no/help] [canal (Não é obrigatório)]`')
              .setFooter(footerText)

            message.channel.send(embedErrorNoXPC)
          }
        
      // Status do SysXP
      } else if (sysXP == 'status') {
        database.ref(`servers/${message.guild.id}/sysXP/`)
          .once('value').then(async function(snap) {
            let statusSysXP = snap.val().status
            database.ref(`servers/${message.guild.id}/sysXP/channels/${message.channel.id}/`)
              .once('value').then(async function(snap) {
                if (snap.val() != null) {
                  let statusNXPC;
                  console.log(snap.val())

                    if (snap.val().permition == 'Ok') {
                      statusNXPC = 'NO ACTIVED'
                    } else {
                      statusNXPC = 'ACTIVED'
                    }
                  
                  let embedStatusSysXP = new Discord.MessageEmbed()
                    .setTitle(`Status do SysXP no Server - ${message.guild.name}`)
                    .setColor('RANDOM')
                    .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
                    .addField(`**SysXp** \`${statusSysXP}\``, `**No_XP_Channel** \`${statusNXPC}\``)
                    .setFooter(footerText)

                  message.channel.send(embedStatusSysXP)
                } else {
                  database.ref(`servers/${message.guild.id}/sysXP/channels/${message.channel.id}`)
                  .update({
                    permition: 'Ok'
                  });
                  console.log(snap.val())
                  let embedStatusSysXP = new Discord.MessageEmbed()
                    .setTitle(`Status do SysXP no Server - ${message.guild.name}`)
                    .setColor('RANDOM')
                    .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
                    .addField(`**SysXp** \`${statusSysXP}\``, `**No_XP_Channel** \`NO\``)
                    .setFooter(footerText)

                  message.channel.send(embedStatusSysXP)
                }
              });
          })
      // Valor incorreto
      } else {
        let embedErrorSysXP = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag}`)
          .setDescription(`Não conheço o valor \`${sysXP}\` ... que tal usar estes :`)
          .addField('**active**', 'responsavél por **ativar** o sistema de xp!')
          .addField('**deactive**', 'responsavél por **desativar** o sistema de xp!')
          .addField('**No_XP_Channel**', 'responsavél por **desativar** o sistema de xp!\nDigite `re.config sysXP No_XP_Channel` help para mais informação')
          .addField('**status**', 'responsavél por **mostart o status** do sistema de xp!')
          .setFooter(footerText)

        message.channel.send(embedErrorSysXP)
      }
    // Canal de LOG
    } else if (option == 'channelLog') {
      message.reply('Comando em manutenção ...')

      /*let channelLog = value;
      // Ativa o canal
      if (channelLog == 'active') {
        // Verifica se foi citado o canal
        if (value2) {
          let channelLOGID = value2.replace('<#', '');
          channelLOGID = channelLOGID.replace('>', '');

          database.ref(`servers/${message.guild.id}/channelLOG/`)
          .update({
            status: "ACTIVED",
            channellID: channelLOGID
          }).then(async () => {
            await message.reply('O canal de logs foi **ativado**!')
          })
        } else {
          message.channel.send(`<:probleminha:714281559607476336> <@${message.author.id}>, você não citou um canal...`)
        }
      // Desativa o canal
      } else if (channelLog == 'deactive') {
        database.ref(`servers/${message.guild.id}/channelLOG/`)
          .update({
            status: "NO_ACTIVED"
          }).then(async () => {
            await message.reply('O canal de logs foi **desativado**!')
          })
      } else if (channelLog == 'status') {
        database.ref(`servers/${message.guild.id}/channelLOG/`)
          .once('value').then(async function(snap) {
            let statusCLOG = snap.val().status
            
            let embedStatusCLOG = new Discord.MessageEmbed()
              .setDescription('Status do canal de log neste servidor : `' + statusCLOG + '`')

            message.channel.send(embedStatusCLOG)
          })
      } else {
        let embedErrorChannelLog = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag}`)
          .setDescription(`Não conheço o valor \`${channelLog}\` ... que tal usar estes :`)
          .addField('**active #channel_log**', 'responsavél por **ativar** o canal de logs!')
          .addField('**deactive**`', 'responsavél por **desativar** do canal de logs!')
          .addField('**status**', 'responsavél por **mostrar o status** do canal de logs!\n*Nota: acesse o `'+ process.env.PREFIX + 'config help channelLog` para obter mais informações*')
          .setFooter(footerText)

        message.channel.send(embedErrorChannelLog)
      }*/
    // Canal de UP Level
    } else if (option == 'channelUPLevel') {
      let channelUPLevel = value;
      
      if(channelUPLevel == 'active') {
        // Verifica se foi citado o canal
        if (value2) {
          let channelUPLID = value2.replace('<#', '');
          channelUPLID = channelUPLID.replace('>', '');

          database.ref(`servers/${message.guild.id}/channelUPlevel/`)
          .update({
            status: "ACTIVED",
            channellID: channelUPLID
          }).then(async () => {
            await message.reply('O canal de UP Levels foi **ativado** e **armazenado**!')
          })
        } else {
          message.channel.send(`<:probleminha:714281559607476336> <@${message.author.id}>, você não citou um canal...`)
        }
      } else if (channelUPLevel == 'deactive') {
        database.ref(`servers/${message.guild.id}/channelUPlevel/`)
          .update({
            status: "DEACTIVED",
          }).then(async () => {
            await message.reply('O canal de UP Level foi **desativado**!')
          })
      } else if (channelUPLevel == 'status') {
        database.ref(`servers/${message.guild.id}/channelUPLevel/`)
          .once('value').then(async function(snap) {
            let statusUPL = snap.val().status
            
            let embedStatusUPL = new Discord.MessageEmbed()
              .setDescription('Status do canal de UP Level neste servidor : `' + statusUPL + '`')

            message.channel.send(embedStatusUPL)
          })
      } else {
        let embedErrorChannelUPlevel = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag}`)
          .setDescription(`Não conheço o valor \`${channelUPLevel}\` ... que tal usar estes :`)
          .addField('**active #channel_up_level**', 'responsavél por **ativar** o canal de up levels!')
          .addField('**deactive**`', 'responsavél por **desativar** do canal de up levels!')
          .addField('**status**', 'responsavél por **mostrar o status** do canal de up level!\n*Nota: acesse o `'+ process.env.PREFIX + 'config help channelUPLevel` para obter mais informações*')
          .setFooter(footerText)

        message.channel.send(embedErrorChannelUPlevel)
      }
    //channelEmbedReputation
    } else if (option == 'channelEmbedReputation') {
      let channelER = value;

      if (channelER == 'active') {
        let idChannelER = value2.replace('<#', '');
            idChannelER = idChannelER.replace('>', '');

        if (idChannelER) {
          if (Number(idChannelER)) {
            database.ref(`servers/${message.guild.id}/channelEmbedReputation/`)
            .update({
              status: "ACTIVED",
              embed: 'NO_SENDED',
              channellID: idChannelER
            }).then(async () => {
              database.ref(`servers/${message.guild.id}/channelEmbedReputation/`)
                .once('value').then(async function(snap) {
                await message.reply('O canal da Embed de Reputação foi **ativado** e **armazenado**!').then(() => {
                  let succesER = client.channels.cache.get(snap.val().channellID);
                  
                  let sendChannelEmbedR = new Discord.MessageEmbed()
                    .setColor('#00ffff')
                    .setTitle('Escolha sua Reputação!')
                    .setDescription('*Pense bem antes de reagir ... dps de reagido não tem como mudar de reputação!*')
                    .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
                    .addFields(
                      { name: '**Negativa**', value: 'Um caminho pelas sombras, cheio de terror, chacinas, tiranias, e com muita maldade 😈, torne-se um demônio.', inline: true },
                      { name: '**Positiva**', value: 'Um caminho pela luz, iluminado pelo heroísmo, amizade e o bem 👼, torne-se um anjo.', inline: true },
                    )
                    .setFooter(footerText + ' - Reaja a baixo:')

                    if (snap.val().embed != 'SENDED') {
                      succesER.send(sendChannelEmbedR)
                        .then(async msg => {
                          database.ref(`servers/${message.guild.id}/channelEmbedReputation/`)
                            .update({
                              embed: 'SENDED',
                              messageID: msg.id
                          });
                          
                          await msg.react('😈');
                          await msg.react('👼');       
                      });                        
                    }
                });
              });
            })
          } else {
            message.reply('Ent eu preciso do canal ...');
          }
        } else {
          message.channel.send(`<:probleminha:714281559607476336> <@${message.author.id}>, você não citou um canal...`)
        }

      } else if (channelER == 'deactive') {
        database.ref(`servers/${message.guild.id}/channelEmbedReputation/`)
          .update({
            status: "DEACTIVED",
            embed: "NONE"
          }).then(async () => {
            await message.reply('O canal da Embed de Reputação foi **desativado**!');
          })
      } else if (channelER == 'status') {
        database.ref(`servers/${message.guild.id}/channelEmbedReputation/`)
        .once('value').then(function(snap){
          let embedStatusCER = new Discord.MessageEmbed()
            .setDescription('Status da embed de reputação neste servidor : `' + snap.val().status + '`')

          message.channel.send(embedStatusCER)
        })          
      } else {
        let embedErrorChannelER = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag}`)
          .setDescription(`Não conheço o valor \`${channelER}\` ... que tal usar estes :`)
          .addField('**active #channel_embedReputation**', 'responsavél por **ativar** e armazenar o id do canal de embed Reputation!')
          .addField('**deactive**`', 'responsavél por **desativar** do canal de up levels!')
          .addField('**status**', 'responsavél por **mostrar o status** do canal de up level!\n*Nota: acesse o `'+ process.env.PREFIX + 'config help channelEmbedReputation` para obter mais informações*')
          .setFooter(footerText)

        message.channel.send(embedErrorChannelER) 
      }
    // help
    } else if (option == 'help') {
      let embedHelp = new Discord.MessageEmbed()
        .setTitle(`<:nhaa:714283616322191432> ${message.author.tag}`)
        .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setDescription(`<:yay:683757961255845927> Aqui todas as configurações do bot :`)
        .addField('<:suavi_fio:714281609322299414> **MANUTENÇÃO prefix**', '**Descrição:** responsavél por mudar o **prefixo** do bot no seu servidor!\n**Como usar:** `' + process.env.PREFIX + 'config prefix re!`')
        .addField('<:rsrs:714305352577056858> **sysXP**', '**Descrição:** responsavél por configurar o **sistema de xp**!\n**Como usar:** `' + process.env.PREFIX + 'config sysXP [active/deactive]`')
        //.addField('<:nhaa:714283616322191432>**channelLog**', '**Descrição:** responsavél por configurar o `canal de logs` do bot!\n**Como usar:** `' + process.env.PREFIX + 'config channelLog [active #channel_log/deactive]`')
        .addField('<:probleminha:714281559607476336>**channelUPLevel**', '**Descrição:** responsavél por configurar o **canal de level up**!\n**Como usar:** `' + process.env.PREFIX + 'config channelUPLevel [active/deactive]`\n*Nota:* acesse `' + process.env.PREFIX + 'config help channelUPLevel` para mais informações ...(desabilitado)')
        .addField('<:yay:683757961255845927>**channelEmbedReputation**', '**Descrição:** responsavél por configurar o canal onde a embed de reputação vai ser enviada!\n**Como usar:** `' + process.env.PREFIX + 'config channelEmbedReputation [active/deactive] #channelEmbedReputation`\n*Nota:* acesse `' + process.env.PREFIX + 'config help channelEmbedReputation` para mais informações ...(desabilitado)')
        .setFooter(footerText)

        message.channel.send(embedHelp);
    } else {
      let mesg
      if (option) {
          mesg =`<:rsrs:714305352577056858> Não conheço a opção \`${option}\` ... que tal dar uma olhada nestes :`
      } else {
          mesg = `<:yay:683757961255845927> Aqui todas as configurações do bot :`
      }

      // <:probleminha:714281559607476336> <:suavi_fio:714281609322299414> <:yay:683757961255845927> <:rsrs:714305352577056858> <:nhaa:714283616322191432>
      let embedErrorValue = new Discord.MessageEmbed()
        .setTitle(`<:nhaa:714283616322191432> ${message.author.tag}`)
        .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setDescription(mesg)
        .addField('<:suavi_fio:714281609322299414> **MANUTENÇÃO prefix**', '**Descrição:** responsavél por mudar o **prefixo** do bot no seu servidor!\n**Como usar:** `' + process.env.PREFIX + 'config prefix re!`')
        .addField('<:nhaa:714283616322191432> **sysXP**', '**Descrição:** responsavél por configurar o **sistema de xp**!\n**Como usar:** `' + process.env.PREFIX + 'config sysXP [active/deactive]`')
        //.addField('<:nhaa:714283616322191432>**channelLog**', '**Descrição:** responsavél por configurar o `canal de logs` do bot!\n**Como usar:** `' + process.env.PREFIX + 'config channelLog [active #channel_log/deactive]`')
        .addField('<:probleminha:714281559607476336>**channelUPLevel**', '**Descrição:** responsavél por configurar o **canal de level up**!\n**Como usar:** `' + process.env.PREFIX + 'config channelUPLevel [active/deactive]`\n*Nota:* acesse `' + process.env.PREFIX + 'config help channelUPLevel` para mais informações ...(desabilitado)')
        .addField('<:yay:683757961255845927>**channelEmbedReputation**', '**Descrição:** responsavél por configurar o canal onde a embed de reputação vai ser enviada!\n**Como usar:** `' + process.env.PREFIX + 'config channelEmbedReputation [active/deactive] #channelEmbedReputation`\n*Nota:* acesse `' + process.env.PREFIX + 'config help channelEmbedReputation` para mais informações ...(desabilitado)')
        .setFooter(footerText)

        message.channel.send(embedErrorValue);
    }
  },

  conf: {
    onlyguilds: true
  },

  get help () {
    return {
      name: 'config',
      category: 'utils',
      description: 'Altera as configurações do bot.',
      usage: 'config help [para ver todos as configurações]'
    }
  }
}
