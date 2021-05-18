const Discord = require("discord.js");
const superagent = require("superagent");
const fetch = require('node-fetch')
const querystring = require ('querystring')

// FILES
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message) => {
    const args = message.content.substring(botconfig.prefix.length).split(" ")

	if (message.content.startsWith(`${botconfig.prefix}urban`)) {		
		const searchString = querystring.stringify({ term: args.slice(1).join(" ") })

        if (!args.slice(1).join(" ")) return message.channel.send(new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`Please try again.`)
        )

        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${searchString}`).then(response => response.json())

        try {
            const [answer] = list

            const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)

            const embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle(answer.word)
                .setURL(answer.permalink)
                .addFields(
                    { name: 'Definition', value: trim(answer.definition, 1024) },
                    { name: 'Example', value: trim(answer.example, 1024) },
                    { name: 'Rating', value: `${answer.thumbs_up} 👍 ${answer.thumbs_down} 👎` },
                )
                .setTimestamp()
                .setFooter('Sick Bot', bot.user.displayAvatarURL());
            message.channel.send(embed)
        } catch (error) {
            console.log(error)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(`No results were found for **${args.slice(1).join(" ")}**`)
            )
        }
	}	
}

module.exports.config = {
    name: "urban",
    aliases: ["urb"]
}