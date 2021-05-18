const Discord = require("discord.js");
const superagent = require("superagent");
// FILES
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Searching...")

        let {body} = await superagent
        .get('http://aws.random.cat/meow')
        console.log(body.file)
        if(!{body}) return message.channel.send("Image not found. Please try again.")

        const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle('Open original')
        .setURL(body.file)
        .setImage(body.file)
        .setTimestamp()
        .setFooter('Sick Bot', bot.user.displayAvatarURL())
        message.channel.send(embed)

        msg.delete();
}

module.exports.config = {
    name: "cat",
    aliases: ["c"]
}