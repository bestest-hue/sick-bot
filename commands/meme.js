const Discord = require("discord.js");
const superagent = require("superagent");
const fetch = require('node-fetch');

// FILES
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");



module.exports.run = async (bot, message, args) => {

    let msg = await message.channel.send("Searching...")

    fetch("https://meme-api.herokuapp.com/gimme")
    .then( res => res.json()).then(body => {
        if(!body) return message.reply("Unable to find a meme. Please try again!")

        const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle(body.title)
        .setURL(body.postLink)
        .setImage(body.url)
        .setTimestamp()
        .setFooter('Sick Bot', bot.user.displayAvatarURL());
        message.channel.send(embed).then(async function (message) {
            await message.react("⬆️")
            await message.react("↕")
            await message.react("⬇️")
        });
        
        msg.delete();
    })
}

module.exports.config = {
    name: "meme",
    aliases: ["m"]
}