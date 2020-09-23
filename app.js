require('dotenv').config();

if (process.version.slice(1).split('.')[0] < 10) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');

const Discord = require('discord.js');
const chalk = require('chalk');
const Enmap = require('enmap');
const firebase = require('firebase');

const { readdirSync } = require('fs');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.commands = new Enmap()
client.startTime = Date.now()

/*
 * FIREBASE CONNECTION
 * Responsavel por fazer a conexão com o banco de dados.
 */
var config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

firebase.initializeApp(config);
// Firebase.analytics()


console.log(`Iniciando o bot Reputation!`);
console.log('')

const cmdsForPublic = readdirSync('./commands/public/')
const cmdsForAdministrator = readdirSync('./commands/administrator/')
const cmdsForSysXP = readdirSync('./commands/sysXP/')
console.log('commands')

/* 
 *              PUBLIC
 */

console.log(`├── ${chalk.yellow('public')} ${chalk.magenta(`[ ${chalk.white('Carregando ' + chalk.green(cmdsForPublic.length) + ' comandos publicos.')} ]`)}`)

cmdsForPublic.forEach(f => {
  try {
  
    const props = require(`./commands/public/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return    

      console.log('│   ├──', `${props.help.name}`, chalk.magenta(`[${chalk.yellow('status:')} ${chalk.green('Ok')}]`))  
    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  
  } catch (e) {
    console.log('│   ├──', `${f}`, `status: ${chalk.yellow(`·:{{[[ ${chalk.red('ERROR')} ]]}}:·`)}`)
    console.log(e)
  }
})

console.log('│   └──', 'Todos os comandos publicos foram listados.')

/* 
 *              SYSXP
 */

console.log(`├── ${chalk.yellow('SysXP')} ${chalk.magenta(`[ ${chalk.white('Carregando ' + chalk.green(cmdsForSysXP.length) + ' comandos do SysXP.')} ]`)}`)

cmdsForSysXP.forEach(f => {
  try {
  
    const props = require(`./commands/sysXP/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return    

      console.log('│   ├──', `${props.help.name}`, chalk.magenta(`[${chalk.yellow('status:')} ${chalk.green('Ok')}]`))  
    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  
  } catch (e) {
    console.log('│   ├──', `${f}`, `status: ${chalk.yellow(`·:{{[[ ${chalk.red('ERROR')} ]]}}:·`)}`)
    console.log(e)
  }
})

console.log('│   └──', 'Todos os comandos do SysXP foram listados.')

/* 
 *              ADMINISTRATOR
 */

console.log(`└── ${chalk.yellow('administrator')} ${chalk.magenta(`[ ${chalk.white('Carregando ' + chalk.green(cmdsForAdministrator.length) + ' comandos para administradores.')} ]`)}`)

cmdsForAdministrator.forEach(f => {
  try {
  
    const props = require(`./commands/administrator/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return    

      console.log('    ├──', `${props.help.name}`, chalk.magenta(`[${chalk.yellow('status:')} ${chalk.green('Ok')}]`))  
    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  
  } catch (e) {
    console.log('│   ├──', `${f}`, `status: ${chalk.yellow(`·:{{[[ ${chalk.red('ERROR')} ]]}}:·`)}`)
    console.log(e)
  }
})

console.log('    └──', 'Todos os comandos de administração foram listados.')

const evtFiles = readdirSync('./events/')
evtFiles.forEach(f => {
  const eventName = f.split('.')[0]
  const event = require(`./events/${f}`)

  client.on(eventName, event.bind(null, client))
})
console.log('')
console.log('Todos os eventos foram carregados.')

console.log(' ')

client.on('error', (err) => {
  console.log('error', err)
})

client.login('process.env.TOKEN');
