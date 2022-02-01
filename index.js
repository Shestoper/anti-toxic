const {Client , Intents} = require('discord.js');
const bot = new Client({intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_PRESENCES]});
const {token} = require('./config.json');


bot.on('presenceUpdate' , async(oldMember , newMember) => {
    if(newMember.activities.toString == "League of Legends" && newMember.activities.type == "PLAYING"){
        if(!newMember.member.bannable){
            newMember.member.send({content: 'Stop playing league retard.'})
        }
        newMember.member.ban("Banned due playing league, fucking nerd.")
    }
})

bot.on('ready' , () => {
    console.log(`${bot.user.tag} has logged.`)
})

bot.login(token);