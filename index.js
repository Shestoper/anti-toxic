const Eris = require('eris');
const {token , version} = require('./config.json')
const axios = require('axios').default;
const bot = new Eris(token , {
    intents: ['guilds' , 'guildPresences']
});

bot.on('ready', () => {
    console.log(`${bot.user.username} became online.`)
    versionChecker();
})

bot.on('presenceUpdate', async(newMember , oldMember) => {

    switch(check(newMember)){
        case true:
            if(!newMember.member.bannable){
                let dm = await bot.getDMChannel(newMember.user.id).catch(console.error);
                return bot.createMessage(dm.id , 'Stop playing league retard.').catch(console.error);
            }
            
            newMember.member.ban("Banned due playing league, fucking nerd.")
            break;
    }

    switch(check(oldMember)){
        case true:
            if(!oldMember.member.bannable){
                let dm = await bot.getDMChannel(oldMember.user.id).catch(console.error);
                return bot.createMessage(dm.id , 'Stop playing league retard.').catch(console.error);
            }
            
            oldMember.member.ban("Banned due playing league, fucking nerd.")
            break;
    }

})

bot.on('guildMemberAdd' , async(guild , member) => {
    
    switch(check(member)){
        case true:
            member.ban("Banned due playing league, fucking nerd.")
            break;
    }

})

async function check(user){

    user.activities.map(act => {
        if(act.name === "League of Legends"){
            return true;
        }
        else return false;
    });

}

async function versionChecker(){
    

    axios.get('https://raw.githubusercontent.com/peacin/anti-toxic/master/version.txt')
    .then(res => {
        if(version != res.data.trim()){
            console.log("Outaded version. Redownload.")
        }
    })
    .catch(err => {
        console.error(err);
    })
}

bot.connect();