const Discord = require('discord.js');
const axios = require('axios');

let consultations = [];
let times = "";
let email = "";

axios.get('https://api.bredbrains.tech/consultations').then(response => {
    consultations = response.data.data;
    console.log(consultations);
})

function sendError() {
    return new Discord.MessageEmbed()
        .setColor('#E74C3C')
        .setTitle('Error!')
        .setDescription('No such teacher, maybe, try again?')
}

function sendSuccess(consultation, msg) {
    let times;
    for (i = 0; i < consultation.times.length; i++) {
        times += `${consultation.times[i].weekday}, ${consultation.times[i].time}; `
    }

    return new Discord.MessageEmbed()
        .setColor('#2ECC71')
        .setTitle('Teacher found!')
        .setDescription(`Hey, ${msg.author.toString()}, you can see it now.`)
        .addFields(
            {name: "Name", value: consultation.teacher},
            {name: "Room", value: consultation.room},
            {name: "Email", value: consultation.email},
            {name: "Department", value: consultation.department},
            {name: "Times", value: times}
        );
}

module.exports = {
    name: 'tthk',
    description: 'Show consultations',
    execute(msg, args) {
        const consultation = consultations.filter(c => c.teacher.includes(args))[0];
        return msg.channel.send(consultation ? sendSuccess(consultation, msg) : sendError());
    }
}


