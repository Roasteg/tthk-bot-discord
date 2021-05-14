const Discord = require('discord.js');

let welcomeMessage = new Discord.MessageEmbed()
    .setColor('#2ECC71')
    .setTitle('Bot info')
    .setDescription("Commands available are listed down below")
    .addFields(
        { name: "consult", value: "Show consultation times and etc. for specified teacher." },
        { name: "changes", value: "Show changes for specified group." }
    )
    .setAuthor("Bot made by Roasteg, API provided by Nikolas Laus. More info on GitHub page.", "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", "https://github.com/Roasteg/tthk-bot-discord" )
    ;

module.exports = {
    slash: true,
    testOnly: true,
    description: 'Show bot commands and etc.',
    callback: ({}) => {
        return welcomeMessage
    },
    
}