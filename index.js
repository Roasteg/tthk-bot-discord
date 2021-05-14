require('dotenv').config();

const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.DISCORD_TOKEN;
const guildId = "840585859699179531";
const WOKCommands = require('wokcommands');

bot.login(TOKEN);

bot.on('ready', async () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("/tthelp for bot info", {
    type: "PLAYING"
  });

  new WOKCommands(bot, {
    commandsDir: 'commands',
    testServers: [guildId],
    showWarns: false
  })
});
