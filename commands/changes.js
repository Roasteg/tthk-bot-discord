const Discord = require('discord.js');
const axios = require('axios');

let changes = [];

axios.get('https://api.bredbrains.tech/changes').then(response => {
    changes = response.data.data;
    console.log(changes);
});

function sendError() {
    return new Discord.MessageEmbed()
        .setColor('#E74C3C')
        .setTitle('Error!')
        .setDescription('No changes for that group :(')
}

function sendMultipleChanges(change) {
    let dayofweek = "";
    let date = "";
    let lessons = "";
    let teacher = "";
    let room = "";

    let info = new Discord.MessageEmbed()
        .setColor('#2ECC71')
        .setTitle('Changes found!')
        .setDescription(`Here is changes for ${change[0].group}`);

    for (i = 0; i < change.length; i++) {
        info.addFields(
            { name: "Day of week", value: change[i].dayofweek },
            { name: "Date", value: change[i].date, inline: true },
            { name: "Lessons", value: change[i].lessons, inline: true },
            { name: "Teacher", value: change[i].teacher },
            { name: "Room", value: change[i].room || "Not specified", inline: true }
        );
    }
    return info;
}

function sendOneChange(change) {
    if (change.room === "") {
        change.room = "Not specified"
    }

    return new Discord.MessageEmbed()
        .setColor('#2ECC71')
        .setTitle('Changes found!')
        .setDescription(`Here is changes for ${change.group}`)
        .addFields(
            { name: "Day of week", value: change.dayofweek },
            { name: "Date", value: change.date },
            { name: "Group", value: change.group },
            { name: "Lessons", value: change.lessons },
            { name: "Teacher", value: change.teacher },
            { name: "Room", value: change.room },
        );
}

module.exports = {
    slash: true,
    testOnly: true,
    description: 'Show changes for specified group',
    syntaxError: 'Looks like you forgot to mention a group',
    expectedArgs: '<group>',
    minArgs: 1,
    callback: async ({ args }) => {
        const change = changes.filter(c => c.group.toLowerCase().includes(args.toString().toLowerCase()));

        if (change.length > 1) {
            return sendMultipleChanges(change)
        }
        else if (change.length == 1) {
            return sendOneChange(change[0]);
        }

        return sendError()

    }
}