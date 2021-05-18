const Discord = require("discord.js");
const superagent = require("superagent");
// FILES
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setColor(colors.blue)
        .setTitle("Server Information")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .addField("Server Name:", `${message.guild.name}`, true)
        .addField("Server Owner:", `${message.guild.owner}`, true)
        .addField("Member Count:", `${message.guild.memberCount}`, true)
        .addField("Role Count:", `${message.guild.roles.size}`, true)
        .setFooter('Sick Bot', bot.user.displayAvatarURL());
        message.channel.send(embed)
}

module.exports.config = {
    name: "serverinfo",
    aliases: ["si"]
}