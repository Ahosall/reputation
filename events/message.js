const Discord = require('discord.js')
const chalk = require('chalk')
const firebase = require('firebase')

const database = firebase.database();

module.exports = async (client, message) => {

  if (message.author.bot) return
  await database.ref(`servers/${message.guild.id}/prefix/`).once("value").then(async function(snap) {
  
    global.footerText = `${client.user.username} - ${message.guild.name}`;  

    /** sysXP
      * sistema responsavél por dar xp aos usuarios isso só vai funcionar se estiver ativado!
      */

      //global.nextLevel;
      global.xp;
      global.level;
      global.idCargo;
      global.reputation;
      global.cargo

      global.pointsAdd = Math.floor(Math.random() * 7) + 8 / 2 - 5;

      database.ref(`servers/${message.guild.id}/`)
      .once('value').then(async function(snap) {
        if (snap.val() == null) {
          database.ref(`servers/${message.guild.id}/`)
          .set({
            sysXP: {
              status: "NO_ACTIVED"
            },
            channelLOG: {
              status: "NO_ACTIVED"
            },
            channelRegister: {
              status: "NO_ACTIVED"
            },
            channelUPLevel: {
              status: "NO_ACTIVED"
            }
          });
        } else {
          if (snap.val().sysXP.status == 'ACTIVED') {
           database.ref(`servers/${message.guild.id}/sysXP/users/${message.author.id}/`)
            .once('value').then(async function(user) {
              if (user.val() == null) {
                database.ref(`servers/${message.guild.id}/sysXP/users/${message.author.id}`)
                .set({
                  xp: pointsAdd,
                  level: 0,
                  idCargo: 0,
                  reputation: 'None',
                  cargo: 'Simples membro.'
                });
              } else {
                await database.ref(`servers/${message.guild.id}/sysXP/channels/${message.channel.id}`)
                  .once('value').then(async function(snap) {
                  if (snap.val() == null) {
                    database.ref(`servers/${message.guild.id}/sysXP/channels/${message.channel.id}`)
                    .update({
                        permition: 'Ok'
                    });
                  } else if (snap.val().permition == 'Ok') {
                      await database.ref(`servers/${message.guild.id}/sysXP/xp/id/${user.val().idCargo}/`)
                        .once('value').then(async function(data) {
                          
                          let nextLevel = await data.val().xpMax.value

                          await database.ref(`servers/${message.guild.id}/sysXP/xp/id/${user.val().idCargo + 1}/`)
                            .once('value').then(async function(proxInfoRole) {

                              xp = user.val().xp;
                              level = user.val().level;
                              idCargo = user.val().idCargo;
                              reputation = user.val().reputation;


                              if (reputation == 'NEGATIVE') {
                                cargo = proxInfoRole.val().NEGATIVE
                              } else if (reputation == 'POSITIVE') {
                                cargo = proxInfoRole.val().POSITIVE
                              }
                              //console.log(message.author.tag, xp, level, idCargo, cargo, reputation, nextLevel)
                              
                              if (reputation != 'None') {
                                if (xp >= nextLevel) {
                                  database.ref(`servers/${message.guild.id}/sysXP/users/${message.author.id}`)
                                    .update({
                                        level: level + 1,
                                        idCargo: idCargo + 1,
                                        cargo: cargo
                                  }).then(() => {
                                      message.member.roles.add(message.guild.roles.cache.find(role => role.name == cargo)).then(() => {
                                        database.ref(`servers/${message.guild.id}/channelUPlevel/`)
                                          .once('value').then(async function(snap) {
                                            if (snap.val() != null) {
                                              if (snap.val().status == "ACTIVED") {

                                                let msgUp = `Parabéns <@${message.author.id}>, você passou para o level **${level + 1}**! <:pamicoffe:727598993751670804>`

                                                let channelUID = client.channels.cache.get('' + snap.val().channellID + '')

                                                channelUID.send(msgUp);
                                              } else {
                                                await message.channel.send(`Parabéns <@${message.author.id}>, você passou para o level **${level + 1}**! <:pamicoffe:727598993751670804>`)
                                              }
                                            }
                                        });
                                      })
                                      .catch(console.error)
                                  });                                                    
                                } else {
                                  database.ref(`servers/${message.guild.id}/sysXP/users/${message.author.id}`)
                                  .update({
                                    xp: xp + pointsAdd
                                  });
                                }
                              }
                          });
                      });
                    }
                });
              }
            });
          }       
        }
      });
      const serverPrefixCustom = snap.val().custom;
      const serverPrefixDefault = snap.val().default;

      let args;
      
      if (message.content.indexOf(serverPrefixDefault) !== 0) {
        if (serverPrefixCustom != 'NO') {
          args = message.content.slice(serverPrefixDefault.length).trim().split(/ +/g)
        } else {
          return
        }
      } else if (message.content.indexOf(serverPrefixCustom) !== 0) {
        args = message.content.slice(serverPrefixDefault.length).trim().split(/ +/g)
      }
      
      const command = args.shift().toLowerCase()

      const cmd = client.commands.get(command)
      if (!cmd) return

      console.log(`[${chalk.yellow('LOG')}]`, `${message.author.username} (${message.author.id}) executou o comando: ${chalk.yellow(cmd.help.name)}`)
      if (cmd.conf.onlyguilds && !message.guild) return messsage.reply('aki não funciona não ...')
      cmd.run(client, message, args)
    });
}
