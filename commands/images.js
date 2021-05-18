const Discord = require("discord.js");
const superagent = require("superagent");
const cheerio = require('cheerio');
const request = require('request');

var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
        headless: true
    }
})

// FILES
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {
    const arrayOfUsersIds = ['249290169838993408'];

    for (let i = 0; i < arrayOfUsersIds.length; i++) {
    if (message.author.id === arrayOfUsersIds[i]) return message.reply('No 😊');
    };

    let msg = await message.channel.send("Searching...")

    const image_query = args.join(' ');
    if(!image_query) return message.channel.send('Nothing was found.')

    const image_results = await google.scrape(image_query, 10);
    console.log(image_results);

    let image_random = image_results[Math.floor(Math.random() * image_results.length)];
    console.log(image_random);

    
    // Send result
    const embed = new Discord.MessageEmbed()
    .setTitle('Open original')
    .setURL(image_random.url)
    .setColor("BLUE")
    .setImage(image_random.url)
    .setTimestamp()
    .setFooter('Sick Bot', bot.user.displayAvatarURL());
    message.channel.send(embed)

     msg.delete();
}

module.exports.config = {
    name: "image",
    aliases: ["img", "i"]
}