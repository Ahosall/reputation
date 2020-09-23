const chalk = require('chalk')

module.exports = async (client) => {
  console.log('·─────────────────────────────────────────────────────────────────────────────·')
  console.log(`· O Bot foi iniciado completamente com ${chalk.yellow(client.users.cache.size)} usuarios em ${chalk.yellow(client.guilds.cache.size)} servidores.           ·`)
  console.log('·─────────────────────────────────────────────────────────────────────────────·')
  
   /*
	* PLAYING → Jogando.
	* STREAMING → !
	* LISTENING → Ouvindo.
	* WATCHING → Assitindo.
	*/

  let status = [
  	{ name: `${process.env.PREFIX}help para MAIS informações`, type: 'WATCHING' },
  	{ name: `Muitas pessoas digitando em seus teclados ...`, type: 'LISTENING' },
  	{ name: `version »${process.env.VERSION}«`, type: 'PLAYING' },///*,
	  { name: `DEBUG`, type: 'LISTENING' }//*/
  ]

  function setStatus(){
  	let randomStatus = status[Math.floor(Math.random()*status.length)]  	

  	client.user.setPresence({ activity: randomStatus, status: 'dnd' }).catch(console.error);

  }
  setStatus();
  setInterval(() => setStatus(), 5000)
}
