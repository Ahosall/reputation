const Discord = require('discord.js');
const Jimp = require('jimp');
const firebase = require('firebase');
const database = firebase.database();

module.exports = {
  run: async (client, message, args) => {
//    let mentionedUser = message.mentions.users.first() || message.author;
    let mentionedMember;

    if(args[0]) {
      if(message.mentions.members.first()) {
      // console.log('...')
         mentionedMember = message.mentions.members.first()
      // console.log(mentionedMember)
      } else {
        if (Number(args[0])) {
          if(args[0].length >= 18) {
              if (message.guild.members.cache.find(m => m.id == args[0]) != undefined) {
                mentionedMember = message.guild.members.cache.find(m => m.id == args[0])
              } else {
                message.channel.send('Não encontrei o responsavel deste ID. Onde é que o dono deste id foi parar ? **0 ^ 0**')
                return
              }            
          } else {
            message.channel.send('Eu acho que este ID não existe ... **─^─**')
            return
          }
        } else {
          message.channel.send('Ent os IDs são composto por somente numeros não letras .... **=^**')
          return
        }
      }
      //console.log(mentionedMember)
    } else {
      mentionedMember = message.member;
    }
//	console.log(mentionedMember)

    database.ref(`servers/${message.guild.id}/sysXP/users/${mentionedMember.user.id}`)
     .once('value').then(async function(dataUser) {
        
      if (dataUser.val() == null) return message.channel.send('Você não está no banco de dados.')
      
      if (dataUser.val().reputation != "None") {
        message.channel.send('Aguarde ...').then(async msg => {
          
          database.ref(`servers/${message.guild.id}/sysXP/users/${mentionedMember.user.id}/`)
           .once('value').then(async function(snap) {
              
            database.ref(`servers/${message.guild.id}/sysXP/xp/id/${snap.val().idCargo}/`)
             .once('value').then(async function(dataXP) {
                // VARIAVEIS
                let level       =  await snap.val().level;
                let cargo       =  await snap.val().cargo;
                let xp          =  await snap.val().xp;
                let xpEnd       =  await dataXP.val().xpMax.value;
                let reputation  =  await snap.val().reputation;

                let template    =  await Jimp.read('./assets/level/templates/template-2.png').catch((e) => {
                  message.delete()
                  message.channel.send('O template não foi encontrado.');
                  return
                });

                let font_64     =  await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
                let font_32     =  await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
                let mask        =  await Jimp.read('./assets/level/masks/mask-circle.png');
                let background;

                if (snap.val().idCargo == 0) {
                    background  = await Jimp.read('./assets/level/bgs/1.png');
                } else if (snap.val().idCargo == 1) {
                    background  = await Jimp.read('./assets/level/bgs/2.png');
                } else if (snap.val().idCargo == 2) {
                    background  = await Jimp.read('./assets/level/bgs/3.png');
                } else if (snap.val().idCargo == 3) {
                    background  = await Jimp.read('./assets/level/bgs/4.png');
                } else if (snap.val().idCargo == 4) {
                    background  = await Jimp.read('./assets/level/bgs/5.png');
                } else if (snap.val().idCargo == 5) {
                    background  = await Jimp.read('./assets/level/bgs/6.png');
                } else if (snap.val().idCargo == 6) {
                    background  = await Jimp.read('./assets/level/bgs/7.png');
                } else if (snap.val().idCargo == 7) {
                    background  = await Jimp.read('./assets/level/bgs/8.png');
                } else if (snap.val().idCargo == 8) {
                    background  = await Jimp.read('./assets/level/bgs/9.png');
                } else if (snap.val().idCargo == 9) {
                    background  = await Jimp.read('./assets/level/bgs/10.png');
                } else if (snap.val().idCargo == 10) {
                    background  = await Jimp.read('./assets/level/bgs/11.png');
                } else if (snap.val().idCargo == 11) {
                    background  = await Jimp.read('./assets/level/bgs/12.png');
                } else if (snap.val().idCargo == 12) {
                    background  = await Jimp.read('./assets/level/bgs/13.png');
                } else if (snap.val().idCargo == 17) {
                    background  = await Jimp.read('./assets/level/bgs/17.png');
                }

              Jimp.read(mentionedMember.user.displayAvatarURL({ format: 'png', dynamic: true }))
               .then(async avatar => {
                  avatar.resize(256, 256);
                  mask.resize(256, 256);
                  avatar.mask(mask);
                  
                  background.composite(template, 0, 0)
                  
                  background.print(font_32, 157, 428, { text: mentionedMember.user.username, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER }, 257, 428);

                  background.print(font_32, 800, 70, `Level`); background.print(font_64, 900, 40, level);
                  
                  background.print(font_32, 600, 200, cargo);

                  if (reputation == 'NEGATIVE') {
                    background.print(font_32, 830, 265, 'Dark');
                    background.print(font_32, 485, 428, { text: `-${xp}/-${xpEnd}`, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER }, 585, 428);
                  } else {
                    background.print(font_32, 830, 265, 'Light');
                    background.print(font_32, 485, 428, { text: `${xp}/${xpEnd}`, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER }, 585, 428);
                  }
                  /*//if (tyrant != "YES") {
                    background.print(font_32, 900, 428, `${xp}/${xpEnd}`);  
                  //} else {
                  //  background.print(font_32, 900, 428, ``);
                  //}*/
                  
                  
                  background
                    .composite(avatar, 152, 118)
                    .write('./assets/level/level.png');
                  
                  await msg.delete()
                  await message.channel.send(``, {
                    files: ["./assets/level/level.png"]
                  });
                }).catch(async (e) => {
                console.log(e)
                
                await msg.delete()
                await message.channel.send({ embed: errorJimp });
              });
            });
          });
        });
      } else {
        message.channel.send('Você precisa reagir na Embed de reputação para ver seu nivel ...')
      }
    });	
  },
  conf: {},
  get help() {
    return {
      name: "level",
      category: "SysXP",
      description: "Ping.",
      usage: "level [User]"
    };
  }
};
