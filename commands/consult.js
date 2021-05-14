const Discord = require('discord.js');
const axios = require('axios');

let consultations = [];
let times = "";

axios.get('https://api.bredbrains.tech/consultations').then(response => {
    consultations = response.data.data;
})

function sendError() {
    return new Discord.MessageEmbed()
        .setColor('#E74C3C')
        .setTitle('Error!')
        .setDescription('No such teacher, maybe, try again?')
}

function sendSuccess(consultation) {
    times = "";
    for (i = 0; i < consultation.times.length; i++) {
        times += `${consultation.times[i].weekday}, ${consultation.times[i].time}; `
    }
    if(consultation.email === null){
        consultation.email = "Not specified"
    }

    return new Discord.MessageEmbed()
        .setColor('#2ECC71')
        .setTitle('Teacher found!')
        .setDescription('Here is what I found.')
        .addFields(
            { name: "Name", value: consultation.teacher },
            { name: "Room", value: consultation.room },
            { name: "Email", value: consultation.email },
            { name: "Department", value: consultation.department },
            { name: "Times", value: times }
        );
}

module.exports = {
    slash: true,
    testOnly: true,
    description: 'Show consultation times for specified teacher.',
    syntaxError: 'Looks like you forgot to mention a teacher.',
    expectedArgs: '<teacher>',
    minArgs: 1,
    callback: async ({args}) => {
        const consultation = consultations.filter(c => c.teacher.toLowerCase().includes(args.toString().toLowerCase()))[0];
        return (consultation ? sendSuccess(consultation) : sendError());
    },
}


