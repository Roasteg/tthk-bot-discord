require('dotenv').config();

const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.DISCORD_TOKEN;
const fs = require('fs');
const prefix = process.env.PREFIX;
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

bot.login(TOKEN);
bot.commands = new Discord.Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  switch (command) {
    case 'tthk':
      if(!args.length){
        return message.channel.send("Looks like you forgot to mention a teacher");
      }
      bot.commands.get('tthk').execute(message, args);
      break;
  }
});

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});
