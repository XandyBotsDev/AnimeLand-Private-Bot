
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const db = require('megadb');
const cheerio = require('cheerio');

const request = require('request');
const config = require("./config.json");
const prefix = config.prefix;


var queue = new Map();
// READY MESSAGE 
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
        presence();
    //STATUS
    function presence(){
        client.user.setPresence({
            status: "online",
            activity: {
                name: "anime help | A N I M E   L A N D",
                 type: "PLAYING"
            }
        });
    }
});
client.on("message", async message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

    const command = args.shift().toLocaleLowerCase();

    const serverQueue = queue.get(message.guild.id);

    if(!message.guild) return;


   
   if(command === "say") {
    ///Say Command
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No Perm")

    let texto = args.join(" ")
    if(!texto) return message.channel.send(`<@${message.member.id}> Error!`).then(message => message.delete({ timeout: 5000}))
     message.delete().catch()
     message.channel.send(texto)
}
if (command === 'avatar') {
    if (args[0]) {
        const user = getUserFromMention(args[0]);
        if (!user) {
            return message.reply('Please use a proper mention if you want to see someone else\'s avatar.');
        }

        return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
    }

    return message.channel.send(`<@${message.author.id}> avatar ${message.author.displayAvatarURL({ dynamic: true })}`);
}
else if (command === 'kill') {
    //al poner el comando -kill mandara un mensaje embed
    //al canal especificado con el texto "Oh No Has Asesinado a ${taggedUser.username} "
    //con un gif embed de www.gihpy.com
    const taggedUser = message.mentions.users.first();
    const kill = new Discord.MessageEmbed()
    .setTitle(`Oh No **${message.member.displayName}**! You Killed **${taggedUser.username}** D:`)
    .setImage("https://media.giphy.com/media/11HeubLHnQJSAU/giphy.gif")
    .setColor("RANDOM")
    message.channel.send(kill)

    

    
}
else if (command === 'revive') {
    const taggedUser = message.mentions.users.first();
    const kill = new Discord.MessageEmbed()
    .setTitle(`Oh **${message.member.displayName}** You revived **${taggedUser.username}** :sweat_smile: `)
    .setImage("https://media.giphy.com/media/11HeubLHnQJSAU/giphy.gif")
    .setColor("RANDOM")
    message.channel.send(kill)

    
}
if(command == "meme") {
    const meme = new Discord.MessageEmbed()
    .setTitle(`First result of "Meme" on giphy.com`)
    .setColor("RANDOM")
    .setImage("https://media.giphy.com/media/aFTt8wvDtqKCQ/giphy.gif")
    .setThumbnail("https://media.giphy.com/media/3o6gbbuLW76jkt8vIc/giphy.gif")
        message.channel.send(meme)
}



else if (command === 'pat') {
    const taggedUser = message.mentions.users.first();
    const kill = new Discord.MessageEmbed()
    .setTitle(`**${message.member.displayName}** Keep caressing **${taggedUser.username}**:3`)
    .setImage("https://media.giphy.com/media/4HP0ddZnNVvKU/giphy.gif")
    .setColor("RANDOM")
    message.channel.send(kill)

    
}

else if (command === 'hug') {
    const taggedUser = message.mentions.users.first();
    const kill = new Discord.MessageEmbed()
    .setTitle(`**${message.member.displayName}** Don't stop hugging **${taggedUser.username}** :3`)
    .setImage(" https://media.giphy.com/media/GMFUrC8E8aWoo/giphy.gif")
    .setColor("RANDOM")
    message.channel.send(kill)

    
}

else if (command === 'kiss') {
    const taggedUser = message.mentions.users.first();
    const kill = new Discord.MessageEmbed()
    .setTitle(`**${message.member.displayName}**! You just kissed **${taggedUser.username}** xd!`)
    .setImage("https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif")
    .setColor("RANDOM")
    message.channel.send(kill)

    
}

else if (command === 'hate') {
    const taggedUser = message.mentions.users.first();
    const kill = new Discord.MessageEmbed()
    .setTitle(`**${message.member.displayName}** You hate **${taggedUser.username}** >:D`)
    .setImage("https://media.giphy.com/media/11WojR0GhjExlm/giphy.gif")
    .setColor("RANDOM")
    message.channel.send(kill)

    
}

else if (command === 'slap') {
    const taggedUser = message.mentions.users.first();
    const kill = new Discord.MessageEmbed()
    .setTitle(`**${message.member.displayName}** Slap!! **${taggedUser.username}**! >:D`)
    .setImage("https://media.giphy.com/media/Gf3AUz3eBNbTW/giphy.gif")
    .setColor("RANDOM")
    message.channel.send(kill)

    
}

else if (command === 'sleep') {
    const kill = new Discord.MessageEmbed()
    .setTitle(`Huaaah I'm very sleepy `)
    .setImage("https://media.giphy.com/media/iQHDtnUZ7gxI4/giphy.gif")
    .setColor("RANDOM")
    message.channel.send(kill)

    
}


else if (command === 'happy') {
    const taggedUser = message.mentions.users.first();
    const kill = new Discord.MessageEmbed()
    .setTitle(`Hey! **${taggedUser.username}**, Celebrate with  **${message.member.displayName}** Yay!`)
    .setImage("https://media.giphy.com/media/JWGgsu82QDoEE/giphy.gif")
    .setColor("RANDOM")
    message.channel.send(kill)

    
}

else if (command === 'cry') {
    const taggedUser = message.mentions.users.first();
    const kill = new Discord.MessageEmbed()
    .setTitle(`**${message.member.displayName}** S - Sad :(`)
    .setImage("https://media.giphy.com/media/87HkPDUOtN0TC/giphy.gif")
    .setColor("RANDOM")
    message.channel.send(kill)

    
}
else if (command === 'laugh') {
    const taggedUser = message.mentions.users.first();
    const kill = new Discord.MessageEmbed()
    .setTitle(` HAHAHAHHAHAHAH!! `)
    .setImage("https://media.giphy.com/media/TORQpT78yQR5S/giphy.gif ")
    .setColor("RANDOM")
    message.channel.send(kill)


    
}
if(command === "help") {
    let embedhelp = new Discord.MessageEmbed()
    .setTitle(`A n i m e l a n d    Help!`)
    .addField(`anime helpfun`, `Gifs Help`)
    .setColor("#ffff00")

    message.channel.send(embedhelp)
}
if(command === "helpfun") {
    let helfun = new Discord.MessageEmbed()
    .setTitle("Anime HelpFun")
    .addField("anime laugh", "AHSDHASD")
    .addField("anime cry", "life is sad, don't you think?")
    .addField("anime sleep", "Huaaah, I'm so sleepy")
    .addField("anime slap", "Splash! You're going to slap someone")
    .addField("anime hate", "Hate Hate Hate >:3")
    .addField("anime kiss", "Love, Aww :3")
    .addField("anime hug", "I Love you :3")
    .addField("anime pat", "UwU")
    .addField("anime avatar", "Show Your Avatar")
    .addField("anime kill", "Dead, Uahahahaha")
    .addField("anime revive", ":9836_FakeBlob:")
    .setColor("#ffff00")
    message.channel.send(helfun)
}


});


client.login(config.token);
