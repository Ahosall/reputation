const Discord = require('discord.js')
const firebase = require('firebase')

const database = firebase.database();

module.exports = async (client, reaction, user, message) => {
	database.ref(`servers/${reaction.message.channel.guild.id}/channelEmbedReputation`).once('value')
	  .then(async function(snap) {
	  	if (reaction.message.id == snap.val().messageID) {
	  		if (reaction.emoji.name == '😈') {
  				database.ref(`servers/${reaction.message.channel.guild.id}/sysXP/users/${user.id}`).once('value')
  				  .then(async function(data) {
	  				if (data.val() != null) {
	  				  	if (data.val().reputation != "POSITIVE") {
							if (data.val().reputation != "NEGATIVE") {
								database.ref(`servers/${reaction.message.channel.guild.id}/sysXP/users/${user.id}/`)
					              .update({
					              	reputation: "NEGATIVE"
					              });
					              
			              		reaction.message.channel.send('<@' + user.id + '> agora está com a reputação demoníaca!')
				              		.then(async msg => {
				              			setTimeout(function() {
				              				msg.delete()
				              			}, 4000)
				              		});
							}
						} else {
							reaction.message.channel.send('<@' + user.id + '>, você não tem o direito de ter uma reputação demoníaca!')
							.then(async msg => {
			              			setTimeout(function() {
			              				msg.delete()
			              			}, 4000)
			              		});
						}
					} else {
					  database.ref(`servers/${reaction.message.channel.guild.id}/sysXP/users/${user.id}`)
			            .set({
			              xp: 0,
			              level: 0,
			              idCargo: 0,
			              reputation: "NEGATIVE",
			              cargo: 'Simples membro.'
			            }).then(() => {
			            	reaction.message.channel.send('<@' + user.id + '> agora está com a reputação demoníaca!')
			            });
			        }
		  		});

	  		} else if (reaction.emoji.name == '👼') {
	  			database.ref(`servers/${reaction.message.channel.guild.id}/sysXP/users/${user.id}`).once('value')
  				  .then(async function(data) {
		  			if (data.val() != null) {
						if (data.val().reputation != "NEGATIVE") {
							if (data.val().reputation != "POSITIVE") {
								database.ref(`servers/${reaction.message.channel.guild.id}/sysXP/users/${user.id}/`)
					              .update({
					              	reputation: "POSITIVE"
					              });

			              		reaction.message.channel.send('<@' + user.id + '> agora está com a reputação angelical!')
			              		.then(async msg => {
			              			setTimeout(function() {
			              				msg.delete()
			              			}, 4000)
				              	});
							}
						} else {
							reaction.message.channel.send('<@' + user.id + '>, você não tem o direito de ter uma reputação angelical!')
							.then(async msg => {
		              			setTimeout(function() {
		              				msg.delete()
		              			}, 4000)
		              		});
						}
					} else {
					  database.ref(`servers/${reaction.message.channel.guild.id}/sysXP/users/${user.id}`)
		                .set({
		                  xp: 0,
		                  level: 0,
		                  idCargo: 0,
		                  reputation: "POSITIVE",
		                  cargo: 'Simples membro.'
		                }).then(() => {
		                	reaction.message.channel.send('<@' + user.id + '> agora está com a reputação angelical!')
		                });	
					}
				});
			}
	  	}
	});
}