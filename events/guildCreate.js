const Discord = require('discord.js');
const firebase = require('firebase');

const database = firebase.database();

module.exports = async (client, guild) => {
	console.log('Log → ', client.user.username, `Entrou no servidor ${guild.name} (${guild.id})`)
  database.ref(`servers/${guild.id}/`)
	.once('value').then(async function(snap) {
		if (snap.val() == null) {
			database.ref(`servers/${guild.id}/`)
	    	.set({
	    	  prefix: {
	            custom: 'NO',
	            default: 're.'
	          },
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
		}
    });
}